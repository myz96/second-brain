import { ObjectId } from "mongodb";

let edges;

export default class EdgesDAO {
  static async injectDB(conn) {
    if (edges) {
      return;
    }
    try {
      edges = await conn.db(process.env.DATABASE_NS).collection("edges");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in EdgesDAO: ${e}`
      );
    }
  }

  static async getAllEdges({ filters = {}, page = 0, edgesPerPage = 20 } = {}) {
    try {
      const cursor = edges
        .find(filters)
        .skip(page * edgesPerPage)
        .limit(edgesPerPage);
      const edgesList = await cursor.toArray();
      const totalNumEdges = await edges.countDocuments(filters);
      return { edgesList, totalNumEdges };
    } catch (e) {
      console.error(`Unable to retrieve edges: ${e}`);
      return null;
    }
  }

  static async getAllEdgesByUserId(userId) {
    try {
      const userIdObject = new ObjectId(userId)
      const cursor = await edges.find({ user_id: userIdObject });
      const edgesList = await cursor.toArray();
      return edgesList;
    } catch (e) {
      console.error(`Unable to get nodes: ${e}`);
      return { error: e };
    }
  }

  static async getEdge({ page = 0, edgesPerPage = 20 } = {}) {
    try {
      const edge = await edges.find().sort({ _id: -1 }).limit(1).toArray();
      if (!edge || edge.length === 0) {
        throw new Error("No edges found.");
      }
      return edge[0];
    } catch (e) {
      console.error(`Unable to find edge: ${e}`);
      return null;
    }
  }

  static async addEdge(userId, from, to, color) {
    try {
      const newEdge = {
        user_id: new ObjectId(userId),
        from: from,
        to: to,
        color: color
      };
      const result = await edges.insertOne(newEdge);
      return result;
    } catch (e) {
      console.error(`Unable to post edge: ${e}`);
      return { error: e };
    }
  }

  static async deleteEdge(userId, from, to) {
    try {
      const deleteResponse = await edges.deleteOne({
        user_id: new ObjectId(userId),
        from: from,
        to: to,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete edge: ${e}`);
      return { error: e };
    }
  }
}
