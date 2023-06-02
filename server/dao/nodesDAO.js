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

  static async addNode(userId, label, title, edges) {
    try {
      const nodeDoc = {
        user_id: ObjectId(userId),
        label: label,
        title: title,
        edges: edges,
      };
      return await nodes.insertOne(nodeDoc);
    } catch (e) {
      console.error(`Unable to post node: ${e}`);
      return { error: e };
    }
  }

  static async updateNode(nodeId, userId, label, title, edges) {
    try {
      const updateResponse = await nodes.updateOne(
        { user_id: ObjectId(userId), _id: ObjectId(nodeId) },
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
      const deleteResponse = await nodes.deleteOne({
        _id: ObjectId(nodeId),
        user_id: ObjectId(userId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete node: ${e}`);
      return { error: e };
    }
  }
}
