const express = require("express");
const Router = express.Router;
const userRouter = Router();

userRouter.post("/signup", () => {});

userRouter.post("/login", (req, res) => {
  res.json({ msg: "logged-in" });
});

userRouter.post("/purchase", () => {});
userRouter.get("/purchase", () => {});

module.exports = userRouter;
