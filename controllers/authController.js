const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.Login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah! 😠" });

    req.session.userId = user.uuid;
    const { uuid, nama, email, role } = user;
    res.status(200).json({ uuid, nama, email, role });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.Profile = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  try {
    const user = await userModel.findOne({
      attributes: ["uuid", "nama", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
