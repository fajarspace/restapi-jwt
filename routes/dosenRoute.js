const express = require("express");
const {
  getDosen,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen,
} = require("../controllers/dosenController");
const {
  verifyUser,
  adminOnly,
  authenticateToken,
} = require("../middleware/auth");

const router = express.Router();

router.post("/api/dosen", verifyUser, adminOnly, createDosen);
router.get("/api/dosen", getDosen);
router.get("/api/dosen/:id", getDosenById);
router.patch("/api/dosen/:id", verifyUser, adminOnly, updateDosen);
router.delete("/api/dosen/:id", verifyUser, adminOnly, deleteDosen);

module.exports = router;
