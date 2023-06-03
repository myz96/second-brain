import UsersDAO from "../dao/usersDAO.js";
import { checkPasswordHash } from "../utils/password.js";

export default class SessionsController {
  static async apiCreateSession(req, res, next) {
    try {
      const { username, password } = req.body

      const user = await UsersDAO.getUserByUsername(username) 

      if(user && checkPasswordHash(password, user.password_hash)) {
        delete user.password_hash
        req.session.user = user
        return res.status(200).json({ 
          message: "Successfully logged in", 
          user: {
            _id: user._id,
            username: user.username
          } 
        })
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async apiGetSession(req, res, next) {
    const { user } = req.session
    if (!user) {
      return res.status(401).json({ message: "Not logged in" })
    }
    res.json(user);
  }

  static async apiDeleteSession(req, res, next) {
    req.session.destroy()
    res.json({ message: "Logged out successfully" })
  }
}
