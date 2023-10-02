const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

module.exports = db;
