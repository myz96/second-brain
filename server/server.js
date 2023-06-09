import express from "express";
import cors from "cors";
import session from "express-session"

import nodes from "./api/nodes.route.js";
import users from "./api/users.route.js";
import sessions from "./api/sessions.route.js";
import edges from "./api/edges.route.js";

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

app.use("/api/users", users);
app.use("/api/nodes", nodes);
app.use("/api/sessions", sessions);
app.use("/api/edges", edges);
app.use("*", (req, res) => res.status(404).json({ error: "Path not found" }));

export default app;
