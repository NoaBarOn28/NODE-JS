const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  const token = jwt.sign(
    { _id: user._id, biz: user.biz, isAdmin: user.isAdmin },
    config.get("jwtKey")
  );
  return token;
}

function verifyToken(tokenFromUSer) {
  try {
    const userData = jwt.verify(tokenFromUSer, config.get("jwtKey"));
    // console.log("userData from verifyToken function ", userData);
    return userData;
  } catch (error) {
    // console.log("verifyToken function Error:", error.message);
    return null;
  }
}

module.exports = { generateAuthToken, verifyToken };
