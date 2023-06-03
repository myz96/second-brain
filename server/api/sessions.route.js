import express from "express";

import SessionsController from "./sessions.controller.js";

const router = express.Router();

router
  .route("/")
  .post(SessionsController.apiCreateSession)
  .get(SessionsController.apiGetSession)
  .delete(SessionsController.apiDeleteSession)

export default router;
