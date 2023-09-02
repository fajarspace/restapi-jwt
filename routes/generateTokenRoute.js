const express = require("express");
const {
  generateToken,
  generateTokenExp,
} = require("../controllers/tokenController");
const {
  verifyUser,
  adminOnly,
  authenticateToken,
} = require("../middleware/auth");

const router = express.Router();

router.post("/api/generatetokenexp", verifyUser, generateTokenExp);
router.post("/api/generatetoken", verifyUser, generateToken);

module.exports = router;
