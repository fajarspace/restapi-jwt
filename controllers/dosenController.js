const dosenModel = require("../models/dosenModel");
const userModel = require("../models/userModel");
const { Op } = require("sequelize");

exports.getDosen = async (req, res) => {
  try {
    const response = await dosenModel.findAll({
      attributes: ["uuid", "nidn", "nama", "email", "telp", "linkwa"],
      // include: [
      //   {
      //     model: userModel,
      //     attributes: ["nama", "email"],
      //   },
      // ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getDosenById = async (req, res) => {
  try {
    const dsn = await dosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Dosen tidak ditemukan" });
    const response = await dosenModel.findOne({
      attributes: ["uuid", "nidn", "nama", "email", "telp", "linkwa"],
      where: {
        id: dsn.id,
      },
      // include: [
      //   {
      //     model: userModel,
      //     attributes: ["nama", "email"],
      //   },
      // ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createDosen = async (req, res) => {
  const { nama, nidn, email, telp, linkwa } = req.body;
  try {
    await dosenModel.create({
      nama: nama,
      nidn: nidn,
      email: email,
      telp: telp,
      linkwa: linkwa,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Dosen berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateDosen = async (req, res) => {
  try {
    const dsn = await dosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama, nidn, email, telp, linkwa } = req.body;
    await dosenModel.update(
      {
        nama,
        nidn,
        email,
        telp,
        linkwa,
      },
      {
        where: {
          id: dsn.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Dosen berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteDosen = async (req, res) => {
  try {
    const dsn = await dosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama, nidn, email, telp, linkwa } = req.body;
    if (req.role === "admin") {
      await dosenModel.destroy({
        where: {
          id: dsn.id,
        },
      });
    } else {
      if (req.userId !== dsn.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await dosenModel.destroy({
        where: {
          [Op.and]: [{ id: dsn.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus dsn berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
