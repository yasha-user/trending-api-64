const { Sequelize } = require("sequelize");
module.exports = new Sequelize("exampledatabase", "postgres", "skywalker99_", {
  host: "localhost",
  dialect: "postgres",
});
