const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.json(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.json(401).json({ message: "Not authenticated" });
  }
}

module.exports = { userAuth };
