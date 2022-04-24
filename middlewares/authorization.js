const { verifyToken } = require("../services/token");

function authorizationMiddlware(req, res, next) {
  const tokenFromClient = req.header("token");
  if (!tokenFromClient) return res.status(401).json("Please Send Token");

  const userInfo = verifyToken(tokenFromClient); // thats what im going to get
  // { _id: user._id, biz: user.biz, isAdmin: user.isAdmin }
  if (!userInfo) return res.status(401).json("Invalid  Token!");

  req.user = userInfo;

  next();
}

module.exports = authorizationMiddlware;
