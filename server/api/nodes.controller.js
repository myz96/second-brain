import NodesDAO from "../dao/nodesDAO.js";

export default class NodesController {
  static async apiGetNodes(req, res, next) {
    const nodesPerPage = req.query.nodesPerPage
      ? parseInt(req.query.nodesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.label) {
      filters.label = req.query.label;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { nodesList, totalNumNodes } = await NodesDAO.getNodes({
      filters,
      page,
      nodesPerPage,
    });

    let response = {
      nodes: nodesList,
      page: page,
      filters: filters,
      entries_per_page: nodesPerPage,
      total_results: totalNumNodes,
    };
    res.json(response);
  }

  static async apiAddNode(req, res, next) {
    try {
      const userId = req.body.user_id;
      const label = req.body.label;
      const title = req.body.title;
      const edges = req.body.edges;

      const nodeResponse = await NodesDAO.addNode(userId, label, title, edges);
      res.json({ status: "success", node: nodeResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateNode(req, res, next) {
    try {
      const nodeId = req.body._id;
      const userId = req.body.user_id;
      const label = req.body.label;
      const title = req.body.title;
      const edges = req.body.edges;

      const nodeResponse = await NodesDAO.updateNode(
        nodeId,
        userId,
        label,
        title,
        edges
      );

      var { error } = nodeResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (nodeResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update node - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteNode(req, res, next) {
    try {
      const nodeId = req.body._id;
      const userId = req.body.user_id;
      const nodeResponse = await NodesDAO.deleteNode(nodeId, userId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
