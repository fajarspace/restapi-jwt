const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const tokenModel = require("../models/tokenModel");

dotenv.config();

exports.generateTokenExp = async (req, res) => {
  try {
    const tokenPayload = {
      nama: req.nama,
      email: req.email,
    };

    const token = jwt.sign(tokenPayload, process.env.SESS_SECRET, {
      expiresIn: "60m",
    });

    // Assuming you have a variable 'expires' defined somewhere
    // If 'expires' is meant to be dynamic, please define it accordingly.
    const expires = new Date().getTime() + 60 * 60 * 1000; // 60 minutes from now

    await tokenModel.create({
      token: token,
      expires: expires,
      userId: req.userId,
    });

    res.json({ token, tokenPayload });
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid credentials");
  }
};

exports.generateToken = async (req, res) => {
  try {
    const tokenPayload = {
      nama: req.nama,
      email: req.email,
    };

    const token = jwt.sign(tokenPayload, process.env.SESS_SECRET);
    const expires = "no expired";

    await tokenModel.create({
      token: token,
      expires: expires,
      userId: req.userId,
    });

    res.json({ token, tokenPayload });
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid credentials");
  }
};
