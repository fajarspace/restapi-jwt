const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyUser, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/api/users", createUser);
router.get("/api/users", verifyUser, adminOnly, getUser);
router.get("/api/users/:id", verifyUser, adminOnly, getUserById);
router.patch("/api/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/api/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
