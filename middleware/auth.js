const jwt = require("jsonwebtoken");
const config = require("config");

// a middleware is just a function that has access to the request and response, and next is a callback
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //console.error(req);
  //if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    //verifies if the token is valid
    const decoded = jwt.verify(token, config.get("jwtSecret")); //takes the token sent by header, and the secret
    //console.error(decoded); return just the id, iat and exp
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
