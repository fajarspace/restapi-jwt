const express = require("express");
const {
  getUsers,
  Register,
  Login,
  Logout,
} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/refreshToken.js");
const { getAllDosen, getDosenById } = require("../controllers/dosen.js");
const {
  getAllPerkuliahan,
  getPerkuliahanByKelas,
  createPerkuliahan,
} = require("../controllers/perkuliahan.js");
const {
  getAllMatkul,
  createMatkul,
  getMatkulById,
} = require("../controllers/matkul.js");
const router = express.Router();

router.get("/api/users", verifyToken, getUsers);
router.post("/api/register", Register);
router.post("/api/login", Login);
router.get("/api/token", refreshToken);
router.delete("/api/logout", Logout);

router.get("/api/dosen", verifyToken, getAllDosen);
router.get("/api/dosen/:uuid", verifyToken, getDosenById);

router.get("/api/matkul", verifyToken, getAllMatkul);
router.get("/api/matkul/:kode_mk", verifyToken, getMatkulById);
// router.post("/api/matkul", createMatkul);

router.get("/api/perkuliahan", verifyToken, getAllPerkuliahan);
// router.post("/api/perkuliahan", createPerkuliahan);
router.get("/api/perkuliahan/:kelas", verifyToken, getPerkuliahanByKelas);

// router.post("/generatetokenexp", verifyToken, generateTokenExp);
// router.post("/generatetoken", generateToken);

module.exports = router;
