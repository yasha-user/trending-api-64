const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Repo = require("../models/Repo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let request = require("request");
const { response } = require("express");
let secs1;
/* 
// add repo
// also needed but for start
const addRepo = (repo) => {
  Repo.create(repo)
    .then((repo) => {
      console.info("New Repo added");
    })
    .catch((err) => console.log(err));
};
 */
// find tr... repo by name or id
const findRepo = (name) => {
  // make case-insensitive
  let search = name.toLowerCase();
  Repo.findAll({
    where: {
      [Op.or]: [
        { item_name: { [Op.like]: "%" + search + "%" } },
        { item_id: { [Op.like]: "%" + search + "%" } },
      ],
    },
  }).then((repo) => {
    console.info(repo);
    console.info(`${repo.length} matches`);
  });
};

// list repos
const listRepos = () => {
  Repo.findAll().then((repos) => {
    console.info(repos);
    console.info(`${repos.length} repos`);
  });
};

function forceSyncFromCli() {
  secs1 = 0;
}

// export all methods
module.exports = {
  findRepo,
  listRepos,
  forceSyncFromCli,
};
