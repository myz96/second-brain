import SessionsDAO from "../dao/sessionsDAO.js";
import UsersDAO from "../dao/usersDAO.js";
import { checkPasswordHash } from "../utils/password.js";

export default class SessionsController {
  static async apiCreateSession(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await UsersDAO.getUserByUsername(username);

      if (user && checkPasswordHash(password, user.password_hash)) {
        delete user.password_hash;
        req.session.user = user;
        const sessionResponse = await SessionsDAO.addSession(user);
        return res.status(200).json({
          message: "Successfully logged in",
          response: sessionResponse,
          user: {
            _id: user._id,
            username: user.username,
          },
        });
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async apiGetAllSessions(req, res, next) {
    const sessionResponse = await SessionsDAO.getAllSessions();
    if (!sessionResponse) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(sessionResponse);
  }

  static async apiGetSession(req, res, next) {
    const sessionResponse = await SessionsDAO.getSession();
    // const { frontendSession } = req.session
    if (!sessionResponse) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(sessionResponse);
  }

  static async apiDeleteSession(req, res, next) {
    req.session.destroy();
    const session = await SessionsDAO.getSession();
    const sessionResponse = await SessionsDAO.deleteSession(session);
    res.json({ message: "Logged out successfully", response: sessionResponse });
  }
}
