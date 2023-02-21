const Sequelize = require("sequelize");
const db = require("../config/database");

const Repo = db.define("newrepo", {
  item_id: { type: Sequelize.STRING },
  item_name: { type: Sequelize.STRING },
  full_name: { type: Sequelize.STRING },
  stargazers_count: { type: Sequelize.STRING },
<<<<<<< HEAD
  description: { type: Sequelize.TEXT },
=======
  description: { type: Sequelize.STRING },
>>>>>>> master
  html_url: { type: Sequelize.STRING },
});

module.exports = Repo;
