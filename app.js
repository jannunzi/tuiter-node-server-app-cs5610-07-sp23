import express from "express";
import cors from "cors";
import MathController from "./math/math-controller.js";
import UserController from "./users/users-controller.js";
import TuiterController from "./tuiter/tuiter-controller.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

TuiterController(app);
MathController(app);
UserController(app);

app.listen(port);
