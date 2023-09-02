const db = require("../config/Database");

const dbPost = async () => {
  await db.sync();
};

module.exports = dbPost;
