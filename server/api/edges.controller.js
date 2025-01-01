import EdgesDAO from "../dao/edgesDAO.js";

export default class EdgesController {
  static async apiGetEdges(req, res, next) {
    const edgesPerPage = req.query.edgesPerPage
      ? parseInt(req.query.edgesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.from) {
      filters.from = req.query.from;
    } else if (req.query.to) {
      filters.to = req.query.to;
    }

    const { edgesList, totalNumEdges } = await EdgesDAO.getAllEdges({
      filters,
      page,
      edgesPerPage,
    });

    let response = {
      edges: edgesList,
      page: page,
      filters: filters,
      entries_per_page: edgesPerPage,
      total_results: totalNumEdges,
    };
    res.json(response);
  }

  static async apiGetAllEdgesByUserId(req, res, next) {
    try {
      const userId = req.params.user_id;
      const edgesList = await EdgesDAO.getAllEdgesByUserId(userId);
      res.json({ status: "success", edges: edgesList });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAddEdge(req, res, next) {
    try {
      const userId = req.body.user_id;
      const from = req.body.from;
      const to = req.body.to;
      const color = req.body.color
      const edgeResponse = await EdgesDAO.addEdge(userId, from, to, color);
      res.json({ status: "success", edge: edgeResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteEdge(req, res, next) {
    try {
      const userId = req.body.user_id;
      const from = req.body.from;
      const to = req.body.to;
      const color = req.body.color
      const edgeResponse = await EdgesDAO.deleteEdge(userId, from, to, color);
      res.json({ status: "success", response: edgeResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
