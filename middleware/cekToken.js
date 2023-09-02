// middleware/checkToken.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    // Token tidak ada dalam permintaan
    req.noToken = true;
    next();
  } else {
    try {
      jwt.verify(token, process.env.SESS_SECRET, (err, decoded) => {
        if (err) {
          // Token tidak valid
          req.tokenInvalid = true;
        } else {
          req.tokenPayload = decoded;
        }
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};
