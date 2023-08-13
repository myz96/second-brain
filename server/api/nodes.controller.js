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

  static async apiGetAllNodesByUserId(req, res, next) {
    try {
      const userId = req.params.user_id;
      const nodesList = await NodesDAO.getAllNodesByUserId(userId);
      res.json({ status: "success", nodes: nodesList });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAddNode(req, res, next) {
    try {
      const userId = req.body.user_id;
      const label = req.body.label;
      const title = req.body.title;
      const group = req.body.group;
      // console.log(group)
      const value = req.body.value;
      const nodeResponse = await NodesDAO.addNode(userId, label, title, group, value);
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
      const group = req.body.group;
      const title = req.body.title;
      const value = req.body.value;

      const nodeResponse = await NodesDAO.updateNode(
        nodeId,
        userId,
        label,
        title,
        group,
        value
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
