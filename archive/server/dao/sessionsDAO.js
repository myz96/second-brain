import { ObjectId } from "mongodb";

let sessions;

export default class SessionsDAO {
  static async injectDB(conn) {
    if (sessions) {
      return;
    }
    try {
      sessions = await conn.db(process.env.DATABASE_NS).collection("sessions");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in SessionsDAO: ${e}`
      );
    }
  }

  static async getAllSessions() {
    try {
      const allSessions = await sessions.find().toArray();
      if (!allSessions) {
        throw new Error("No sessions found.");
      }
      return allSessions;
    } catch (e) {
      console.error(`Unable to retrieve sessions: ${e}`);
      return null;
    }
  }

  static async getSession({ page = 0, sessionsPerPage = 20 } = {}) {
    try {
      const session = await sessions
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      if (!session || session.length === 0) {
        throw new Error("No sessions found.");
      }
      return session[0];
    } catch (e) {
      console.error(`Unable to find session: ${e}`);
      return null;
    }
  }

  static async addSession(user) {
    try {
      const newSession = {
        user_id: new ObjectId(user._id),
        username: user.username,
      };
      const result = await sessions.insertOne(newSession);
      return result;
    } catch (e) {
      console.error(`Unable to post session: ${e}`);
      return { error: e };
    }
  }

  static async deleteSession(user) {
    try {
      const deleteResponse = await sessions.deleteOne({
        user_id: new ObjectId(user.user_id),
        username: user.username,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete session: ${e}`);
      return { error: e };
    }
  }
}
