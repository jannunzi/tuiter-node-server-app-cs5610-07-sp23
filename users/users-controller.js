import users from "./users.js";
import * as usersDao from "./users-dao.js";

const UserController = (app) => {
  const findAllUsers = async (req, res) => {
    // if (currentUser && currentUser.isAdmin) {
    const users = await usersDao.findAllUsers();
    res.json(users);
    // } else {
    //   res.sendStatus(403);
    // }
  };
  const findUserById = async (req, res) => {
    // const userId = req.params.userId;
    // const user = users.find((user) => user._id === userId);
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.sendStatus(404);
    // }
    const user = await usersDao.findUserById(req.params.uid);
    if (user) {
      res.json(user);
      return;
    }
    res.sendStatus(404);
  };

  const createUser = async (req, res) => {
    const user = { ...req.body, _id: new Date().getTime() + "" };
    users.push(user);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    // const newUser = req.body;
    // const index = users.findIndex((user) => user._id === userId);
    // if (index === -1) {
    //   res.sendStatus(404);
    //   return;
    // }
    // users[index] = newUser;
    const status = await usersDao.updateUser(userId, req.body);
    req.session["currentUser"] = req.body;
    res.send(status);
  };
  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    users.splice(index, 1);
    res.sendStatus(200);
  };

  const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };

  // let currentUser = null;
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/profile/:uid", findUserById);

  app.get("/api/users", findAllUsers);
  // app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
};

export default UserController;
