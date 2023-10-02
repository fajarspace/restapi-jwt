const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");

const matkulModel = db.define(
  "matakuliah",
  {
    kode_mk: {
      type: DataTypes.STRING,
    },
    nama_mk: {
      type: DataTypes.STRING,
    },
    sks: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = matkulModel;
