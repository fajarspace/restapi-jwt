const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database.js");
// const dosenModel = require("./models/DosenModel.js");
const router = require("./routes/index.js");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

async function startServer() {
  // await db.sync();

  try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error(error);
  }

  const corsOptions = {
    origin: true,
    credentials: true, // Enable credentials (e.g., cookies)
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);

  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

startServer();
