const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function jwtValidator(req, res, next) {
  jwt.verify(
    req.headers["authorization-token"],
    process.env.SECRET_JWT,
    (err, decoded) => {
      if (err) {
        return res.status(401).send("unauthorized");
      }
      req.authorizationToken = decoded;
      next();
    }
  );
};
