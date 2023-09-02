const express = require("express");
const { Login, logOut, Profile } = require("../controllers/authController");

const router = express.Router();

router.get("/api/profile", Profile);
router.post("/api/login", Login);
router.delete("/api/logout", logOut);

module.exports = router;
