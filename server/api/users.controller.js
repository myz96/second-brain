import UsersDAO from "../dao/usersDAO.js"
import { hashPassword } from "../utils/password.js"

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    } else if (req.query.email) {
      filters.email = req.query.email
    } 

    const { usersList, totalNumUsers } = await UsersDAO.getUsers({
      filters,
      page,
      usersPerPage,
    })

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }
    res.json(response)
  }

  static async apiGetUserById(req, res, next) {
    try {
      let id = req.params.id || {}
      let user = await UsersDAO.getUserByID(id)
      if (!user) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(user)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetUserByUsername(req, res, next) {
    try {
      let username = req.params.username || {}
      let user = await UsersDAO.getUserByUsername(username)
      if (!user) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(user)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiCreateUser(req, res, next) {
    try {
      let { username, password } = req.body;
      username = username.trim();
      password = password.trim();
      
      const password_hash = hashPassword(password);
      const userResponse = await UsersDAO.createUser({
        username: username,
        password_hash: password_hash
      });
  
      if (!userResponse.success) {
        res.status(400).json({ error: userResponse.error });
        return;
      }
      
      const user = userResponse.user;
      req.session.user = user;
  
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  
}
