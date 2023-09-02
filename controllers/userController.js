const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getUser = async (req, res) => {
  try {
    const response = await userModel.findAll({
      attributes: ["uuid", "nama", "email", "role"], // Display only required attributes
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const response = await userModel.findOne({
      attributes: ["uuid", "nama", "email", "role"], // Display only required attributes
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { nama, email, password, konfirmPassword, role } = req.body;
  if (password !== konfirmPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  try {
    const hashPassword = await bcrypt.hash(password, 10); // Specify salt rounds
    await userModel.create({
      nama: nama,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({
      msg: "Registrasi berhasil!",
      nama: nama,
      email: email,
      role: role,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const { nama, email, password, konfirmPassword, role } = req.body;
  let hashPassword = user.password; // By default, use the existing hashed password

  if (password && konfirmPassword && password === konfirmPassword) {
    try {
      hashPassword = await bcrypt.hash(password, 10); // Specify salt rounds
    } catch (error) {
      return res.status(400).json({ msg: "Error hashing the password" });
    }
  }

  try {
    await userModel.update(
      {
        nama: nama,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  try {
    await userModel.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
