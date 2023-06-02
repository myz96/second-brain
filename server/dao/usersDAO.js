import { ObjectId } from "mongodb";
let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.DATABASE_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`
      );
    }
  }

  static async getUsers({ filters = null, page = 0, usersPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("email" in filters) {
        query = { email: { $eq: filters["email"] } };
      }
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);

    try {
      const usersList = await displayCursor.toArray();
      const totalNumUsers = await users.countDocuments(query);

      return { usersList, totalNumUsers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }

  static async createUser(userInfo) {
    try {
      const result = await users.insertOne(userInfo);
      if (result.insertedCount === 0) {
        throw new Error("Failed to insert user in database.");
      }

      const user = await users.findOne({ _id: result.insertedId });

      const userResponse = {
        id: user._id,
        username: user.username,
      };

      return { success: true, user: userResponse };
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { success: false, error: "Username already taken." };
      }
      console.error(`Error occurred while adding new user, ${e}.`);
      return { success: false, error: e };
    }
  }

  static async getUserByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "nodes",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$user_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "nodes",
          },
        },
        {
          $addFields: {
            nodes: "$nodes",
          },
        },
        {
          $project: {
            password_hash: 0,
          },
        },
      ];
      return await users.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getUserByID: ${e}`);
      throw e;
    }
  }
}
