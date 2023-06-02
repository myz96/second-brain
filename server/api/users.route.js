import express from "express";

import UsersController from "./users.controller.js";

const router = express.Router();

router.route("/")
    .get(UsersController.apiGetUsers)
    .post(UsersController.apiCreateUser);

router.route("/id/:id").get(UsersController.apiGetUserById);

export default router;
