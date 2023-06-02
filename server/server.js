import express from "express";
import cors from "cors";
import session from "express-session"

import nodes from "./api/nodes.route.js";
import users from "./api/users.route.js";

const app = express();

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/nodes", nodes);
app.use("*", (req, res) => res.status(404).json({ error: "Path not found" }));

export default app;
