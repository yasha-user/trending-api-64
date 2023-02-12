const Sequelize = require("sequelize");
const db = require("../config/database");

const Repo = db.define("newrepo", {
  item_id: { type: Sequelize.STRING },
  item_name: { type: Sequelize.STRING },
  full_name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  html_url: { type: Sequelize.STRING },
});

module.exports = Repo;
