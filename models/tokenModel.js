const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const userModel = require("./userModel.js");

const tokenModel = db.define(
  "token",
  {
    token: {
      type: DataTypes.STRING,
    },
    expires: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

userModel.hasMany(tokenModel);
tokenModel.belongsTo(userModel, { foreignKey: "userId" });

module.exports = tokenModel;
