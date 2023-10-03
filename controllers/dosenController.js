const dosenModel = require("../models/DosenModel");

exports.getAllDosen = async (req, res) => {
  try {
    const dosen = await dosenModel.findAll({
      attributes: ["uuid", "nama_dosen", "nidn", "email", "telp", "linkwa"],
    });
    res.json({
      status: "success",
      message: `Data Dosen berhasil ditemukan.`,
      data: dosen,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDosenById = async (req, res) => {
  try {
    const uuid = req.params.uuid; // Ambil dosen dari parameter URL
    const dataDosen = await dosenModel.findAll({
      where: { uuid }, // Filter berdasarkan uuid
      attributes: ["uuid", "nama_dosen", "nidn", "email", "telp", "linkwa"],
    });

    if (dataDosen.length === 0) {
      return res.status(404).json({ msg: "Data Dosen tidak ditemukan." });
    }

    res.json({
      status: "success",
      message: `Data Dosen untuk dosen ${uuid} berhasil ditemukan.`,
      data: dataDosen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
