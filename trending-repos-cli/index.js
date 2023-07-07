const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Repo = require("../models/Repo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let request = require("request");
const { response } = require("express");
let secs1;
const { dateValue, url } = require("../routes/newrepos");
console.log(`Request for URL: ${url}`);
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
    process.exit();
  });
};

// list repos
const listRepos = () => {
  Repo.findAll().then((repos) => {
    console.info(repos);
    console.info(`${repos.length} repos`);
    process.exit();
  });
};

function forceSyncFromCli() {
  fetch(url, { dateValue }).then(
    (response) =>
      response.json().then((data) => {
        (async () => {
          await Repo.sync({ force: true });
          // here Repos are added one at a time x5
          for (let i = 0; i < data.items.length; i++) {
            // console.log(` and the number is ${i + 1}`);
            Repo.create({
              item_id: data.items[i].id,
              item_name: data.items[i].name,
              full_name: data.items[i].full_name,
              stargazers_count: data.items[i].stargazers_count,
              description: data.items[i].description,
              html_url: data.items[i].html_url,
            })
              .then(console.log(`Repo ${i + 1} added`))

              .catch((err) => console.log(err));
            if (data.items.length - 1 === i) {
              // console.log(dateValue);
            }
          }
        })();

        console.log("SUCK SESS");
      })
    /*
    .then(function () { 
       process.exit();
    }) */
  );

  // secs1 = 0;
  // console.log("ALLEY OOP!");
}

// export all methods
module.exports = {
  findRepo,
  listRepos,
  forceSyncFromCli,
};
