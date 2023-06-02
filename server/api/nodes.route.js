import express from "express";

import NodesController from "./nodes.controller.js";

const router = express.Router();

router
  .route("/")
  .get(NodesController.apiGetNodes)
  .post(NodesController.apiAddNode)
  .put(NodesController.apiUpdateNode)
  .delete(NodesController.apiDeleteNode);

export default router;
