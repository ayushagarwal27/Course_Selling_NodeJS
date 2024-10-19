const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");

function adminAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.json(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.json(401).json({ message: "Not authenticated" });
  }
}

module.exports = { adminAuth };
