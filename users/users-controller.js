import users from "./users.js";

let currentUser = null;

const UserController = (app) => {
  const findAllUsers = (req, res) => {
    if (currentUser && currentUser.isAdmin) {
      res.json(users);
    } else {
      res.sendStatus(403);
    }
  };
  const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = users.find((user) => user._id === userId);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const createUser = (req, res) => {
    const user = { ...req.body, _id: new Date().getTime() + "" };
    users.push(user);
    res.json(user);
  };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const newUser = req.body;
    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    users[index] = newUser;
    res.sendStatus(200);
  };
  const deleteUser = (req, res) => {
    const userId = req.params.userId;
    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    users.splice(index, 1);
    res.sendStatus(200);
  };

  const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((user) => user.username === username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = { username, password, _id: new Date().getTime() + "" };
    currentUser = newUser;
    users.push(newUser);
    res.json(newUser);
  };

  let currentUser = null;
  app.post("/api/users/register", register);
  app.post("/api/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      currentUser = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
  app.post("/api/users/profile", (req, res) => {
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  });
  app.post("/api/users/logout", (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  });

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
};

export default UserController;
