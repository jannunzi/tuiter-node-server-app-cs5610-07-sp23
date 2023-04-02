import express from "express";
import cors from "cors";
import MathController from "./math/math-controller.js";
import UserController from "./users/users-controller.js";
import TuiterController from "./tuiter/tuiter-controller.js";
import SessionController from "./session-controller.js";
import mongoose from "mongoose";
import session from "express-session";
const app = express();

app.use(
  session({
    secret: "asdfasdfasdfasdf",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }, // needs HTTPS
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

TuiterController(app);
MathController(app);
UserController(app);
SessionController(app);

mongoose.connect("mongodb://127.0.0.1:27017/tuiter-sp23-07");

app.listen(port);
