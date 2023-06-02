import mongodb from "mongodb";
import dotenv from "dotenv";

import app from "./server.js";
import UsersDAO from "./dao/usersDAO.js";
import NodesDAO from "./dao/nodesDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.DATABASE_URI, {})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    await NodesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
