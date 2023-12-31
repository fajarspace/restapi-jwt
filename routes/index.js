const express = require("express");
const {
  getUsers,
  Register,
  Login,
  Logout,
} = require("../controllers/UserController");
const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken.js");
const {
  getAllDosen,
  getDosenById,
  getDosenByNidn,
} = require("../controllers/Dosen.js");
const {
  getAllPerkuliahan,
  getPerkuliahanByKelas,
  createPerkuliahan,
} = require("../controllers/PerkuliahanController.js");
const {
  getAllMatkul,
  createMatkul,
  getMatkulById,
} = require("../controllers/Matkul.js");
const router = express.Router();

router.get("/api/users", verifyToken, getUsers);
router.post("/api/register", Register);
router.post("/api/login", Login);
router.get("/api/token", refreshToken);
router.delete("/api/logout", Logout);

router.get("/api/dosen", getAllDosen);
router.get("/api/dosen/id/:uuid", getDosenById);
router.get("/api/dosen/nidn/:nidn", getDosenByNidn);

router.get("/api/matkul", getAllMatkul);
router.get("/api/matkul/:kode_mk", getMatkulById);
// router.post("/api/matkul", createMatkul);

router.get("/api/perkuliahan", getAllPerkuliahan);
// router.post("/api/perkuliahan", createPerkuliahan);
router.get("/api/perkuliahan/:kelas", getPerkuliahanByKelas);

// router.post("/generatetokenexp", verifyToken, generateTokenExp);
// router.post("/generatetoken", generateToken);

module.exports = router;
