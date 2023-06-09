import express from "express";

import SessionsController from "./sessions.controller.js";

const router = express.Router();

router
  .route("/")
  .post(SessionsController.apiCreateSession)
  .get(SessionsController.apiGetAllSessions)
  .delete(SessionsController.apiDeleteSession)

router.route("/session").get(SessionsController.apiGetSession)

export default router;
