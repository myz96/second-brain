import express from "express";

import EdgesController from "./edges.controller.js";

const router = express.Router();

router
  .route("/")
  .post(EdgesController.apiAddEdge)
  .get(EdgesController.apiGetEdges)
  .delete(EdgesController.apiDeleteEdge);

router.route("/user/:user_id").get(EdgesController.apiGetAllEdgesByUserId);

export default router;
