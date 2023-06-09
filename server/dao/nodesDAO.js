import { ObjectId } from "mongodb";

let nodes;

export default class NodesDAO {
  static async injectDB(conn) {
    if (nodes) {
      return;
    }
    try {
      nodes = await conn.db(process.env.DATABASE_NS).collection("nodes");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in NodesDAO: ${e}`
      );
    }
  }

  static async getNodes({ filters = null, page = 0, nodesPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("label" in filters) {
        query = { $text: { $search: filters["label"] } };
      } else if ("title" in filters) {
        query = { title: { $eq: filters["title"] } };
      }
    }

    let cursor;

    try {
      cursor = await nodes.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { nodesList: [], totalNumNodes: 0 };
    }

    const displayCursor = cursor.limit(nodesPerPage).skip(nodesPerPage * page);

    try {
      const nodesList = await displayCursor.toArray();
      const totalNumNodes = await nodes.countDocuments(query);

      return { nodesList, totalNumNodes };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { nodesList: [], totalNumNodes: 0 };
    }
  }

  static async getAllNodesByUserId(userId) {
    try {
      const userIdObject = new ObjectId(userId)
      const cursor = await nodes.find({ user_id: userIdObject });
      console.log(userIdObject)
      console.log(cursor)
      const nodesList = await cursor.toArray();
      console.log(nodesList)

      return nodesList;
    } catch (e) {
      console.error(`Unable to get nodes: ${e}`);
      return { error: e };
    }
  }

  static async addNode(userId, label, title, edges) {
    try {
      const newNode = {
        user_id: new ObjectId(userId),
        label: label,
        title: title,
        edges: edges,
      };
      const result = await nodes.insertOne(newNode);
      return newNode;
    } catch (e) {
      console.error(`Unable to post node: ${e}`);
      return { error: e };
    }
  }

  static async updateNode(nodeId, userId, label, title, edges) {
    try {
      const nodeObjectId = new ObjectId(nodeId);
      const userObjectId = new ObjectId(userId);
      const updateResponse = await nodes.updateOne(
        { _id: nodeObjectId, user_id: userObjectId },
        { $set: { label: label, title: title, edges: edges } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update node: ${e}`);
      return { error: e };
    }
  }

  static async deleteNode(nodeId, userId) {
    try {
      const nodeObjectId = new ObjectId(nodeId);
      const userObjectId = new ObjectId(userId);
      const deleteResponse = await nodes.deleteOne({
        _id: nodeObjectId,
        user_id: userObjectId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete node: ${e}`);
      return { error: e };
    }
  }
}
