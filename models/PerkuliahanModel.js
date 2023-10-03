const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");
const matkulModel = require("./matkulModel");
const dosenModel = require("./dosenModel");

const perkuliahanModel = db.define(
  "jadwal_perkuliahan",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fakultas: {
      type: DataTypes.STRING,
    },
    prodi: {
      type: DataTypes.STRING,
    },
    smt: {
      type: DataTypes.STRING,
    },
    kelas: {
      type: DataTypes.STRING,
    },
    matakuliahId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    dosenId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    hari_jam: {
      type: DataTypes.STRING,
    },
    ruang: {
      type: DataTypes.STRING,
    },
    mhs: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

matkulModel.hasMany(perkuliahanModel, { foreignKey: "matakuliahId" });
perkuliahanModel.belongsTo(matkulModel, { foreignKey: "matakuliahId" });

dosenModel.hasMany(perkuliahanModel, { foreignKey: "dosenId" });
perkuliahanModel.belongsTo(dosenModel, { foreignKey: "dosenId" });

module.exports = perkuliahanModel;
