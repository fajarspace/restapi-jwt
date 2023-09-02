const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SESS_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

exports.verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Silahkan login" });
  }
  const user = await userModel.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.nama = user.nama;
  req.email = user.email;
  req.role = user.role;
  next();
};

exports.adminOnly = async (req, res, next) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
