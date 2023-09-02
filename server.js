const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const db = require("./config/Database");
const dbPost = require("./models/dbPost");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const dosenRoute = require("./routes/dosenRoute");
const generateTokenRoute = require("./routes/generateTokenRoute");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({
  db: db,
});

// dbPost();

// db.authenticate()
//   .then(() => {
//     console.log("Database Connected...");
//     return tokenModel.sync();
//   })
//   .then(() => {
//     console.log("DB synchronized...");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    proxy: true,
    name: "informatika_upb_proxy",
    cookie: {
      secure: "auto",
      // httpOnly: false,
      // sameSite: "none",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());

// Route - Welcome Page
app.get("/api", (req, res) => {
  res.send(
    "<h1>Selamat datang di API Informatika UPB!</h1><p>Lihat dokumentasi nya di <a href='https://api.informatikaupb.com/'>https://api.informatikaupb.com/</a></p>"
  );
});
app.use(authRoute);
app.use(userRoute);
app.use(dosenRoute);
app.use(generateTokenRoute);

// sessionStore.sync();

app.listen(process.env.PORT, () =>
  console.log(`Server berjalan di port '${process.env.PORT}'`)
);
