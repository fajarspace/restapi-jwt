const matkulModel = require("../models/matakuliah");
const dosenModel = require("../models/dosen");
const perkuliahanModel = require("../models/perkuliahan");

exports.getAllPerkuliahan = async (req, res) => {
  try {
    const perkuliahan = await perkuliahanModel.findAll({
      attributes: [
        "uuid",
        "fakultas",
        "prodi",
        "smt",
        "kelas",
        "hari_jam",
        "ruang",
        "mhs",
      ],
      include: [
        {
          model: matkulModel, // Model yang ingin di-join
          attributes: ["kode_mk", "nama_mk", "sks"],
        },
        {
          model: dosenModel, // Model yang ingin di-join
          attributes: ["nama_dosen", "email"],
        },
      ],
    });

    res.json({
      status: "success",
      message: "Data jadwal perkuliahan berhasil ditemukan.",
      data: perkuliahan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPerkuliahanByKelas = async (req, res) => {
  try {
    const kelas = req.params.kelas; // Ambil kelas dari parameter URL
    const perkuliahan = await perkuliahanModel.findAll({
      where: { kelas }, // Filter berdasarkan kelas
      attributes: [
        "uuid",
        "fakultas",
        "prodi",
        "smt",
        "kelas",
        "hari_jam",
        "ruang",
        "mhs",
      ],
      include: [
        {
          model: matkulModel,
          attributes: ["kode_mk", "nama_mk", "sks"],
        },
        {
          model: dosenModel,
          attributes: ["nama_dosen", "email"],
        },
      ],
    });

    if (perkuliahan.length === 0) {
      return res
        .status(404)
        .json({ msg: "Data jadwal perkuliahan tidak ditemukan." });
    }

    res.json({
      status: "success",
      message: `Data jadwal perkuliahan untuk kelas ${kelas} berhasil ditemukan.`,
      data: perkuliahan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPerkuliahan = async (req, res) => {
  try {
    const {
      fakultas,
      prodi,
      smt,
      kelas,
      matakuliahId,
      hari_jam,
      ruang,
      mhs,
      dosenId,
    } = req.body;

    // Buat entitas perkuliahan baru
    const perkuliahan = await perkuliahanModel.create({
      fakultas,
      prodi,
      smt,
      kelas,
      matakuliahId, // Ini adalah kunci asing yang menghubungkan perkuliahan dengan matkul
      hari_jam,
      ruang,
      mhs,
      dosenId, // Ini adalah kunci asing yang menghubungkan perkuliahan dengan dosen
    });

    res.status(201).json(perkuliahan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
