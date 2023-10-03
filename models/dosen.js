const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");

const dosenModel = db.define(
  "dosen",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nidn: {
      type: DataTypes.STRING,
    },
    nama_dosen: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telp: {
      type: DataTypes.STRING,
    },
    linkwa: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = dosenModel;
