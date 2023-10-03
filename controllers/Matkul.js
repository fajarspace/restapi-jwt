const matkulModel = require("../models/MatkulModel");

exports.getAllMatkul = async (req, res) => {
  try {
    const matkul = await matkulModel.findAll({
      attributes: ["kode_mk", "nama_mk", "sks"],
    });
    res.json({
      status: "success",
      message: `Data Mata Kuliah berhasil ditemukan.`,
      data: matkul,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMatkulById = async (req, res) => {
  try {
    const kode_mk = req.params.kode_mk; // Ambil Matkul dari parameter URL
    const dataMatkul = await matkulModel.findAll({
      where: { kode_mk }, // Filter berdasarkan kode_mk
      attributes: ["kode_mk", "nama_mk", "sks"],
    });

    if (dataMatkul.length === 0) {
      return res.status(404).json({ msg: "Data Matkul tidak ditemukan." });
    }

    res.json({
      status: "success",
      message: `Data Matkul untuk Matkul ${kode_mk} berhasil ditemukan.`,
      data: dataMatkul,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createMatkul = async (req, res) => {
  try {
    const { kode_mk, nama_mk, sks } = req.body;

    // Buat entitas perkuliahan baru
    const perkuliahan = await matkulModel.create({
      kode_mk,
      nama_mk,
      sks,
    });

    res.status(201).json(perkuliahan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
