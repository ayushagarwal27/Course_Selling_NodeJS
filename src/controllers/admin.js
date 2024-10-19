const express = require("express");
const { z } = require("zod");
const Router = express.Router;
const adminRouter = Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");
const { adminAuth } = require("../middlewares/admin");

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

adminRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedBody = signUpSchema.safeParse(body);

  if (!parsedBody.success) {
    res.status(411).json({ message: "Invalid inputs" });
    return;
  }
  const { email, name, password } = parsedBody.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, name, password: hashedPassword });
    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post("/login", async (req, res) => {
  const body = req.body;
  const parsedBody = signInSchema.safeParse(body);

  if (!parsedBody.success) {
    res.status(411).json({ message: "Invalid inputs" });
    return;
  }
  const { email, password } = parsedBody.data;
  const findFromDb = await Admin.findOne({ email });
  if (!findFromDb) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  const isCorrectPassword = await bcrypt.compare(password, findFromDb.password);
  if (!isCorrectPassword) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }

  const jwtToken = jwt.sign(
    {
      user: {
        userId: findFromDb._id,
        name: findFromDb.name,
        email: findFromDb.email,
      },
    },
    JWT_SECRET,
  );
  res.json({ token: jwtToken });
});

adminRouter.post("/course", adminAuth, (req, res) => {
  res.send(req.user);
});
adminRouter.patch("/course/:id", adminAuth, () => {});
adminRouter.delete("/course/:id", adminAuth, () => {});

module.exports = adminRouter;
