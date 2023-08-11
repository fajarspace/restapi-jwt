const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const SECRET_KEY = "hehehe";

app.use(express.json());

const dosenData = [
  { id: 1, name: "Alfiyan, S.Kom" },
  { id: 2, name: "Edora, M.Pd" },
  { id: 3, name: "M. Najamuddin, M.Kom" },
  { id: 4, name: "Wahyu Hadikristanto, M.Kom" },
];

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "fajar" && password === "123") {
    const user = { username };

    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "60s" });

    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.get("/dosen", authenticateToken, (req, res) => {
  // Hanya mengizinkan akses jika token valid
  res.json(dosenData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
