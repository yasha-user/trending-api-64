const express = require("express");

const { url, dateValue } = require("../routes/newrepos");

const db = require("../config/database");
const Repo = require("../models/Repo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let request = require("request");
const { response } = require("express");
const { json } = require("body-parser");

console.log(`Request for URL: ${url})}`);

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
  fetch(url, { dateValue })
    .then((response) =>
      response.json().then((data) => {
        (async () => {
          try {
            Repo.sync({ force: true });
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
                let looped = true;
              }
            }
          } catch (error) {
            console.log(error);
          }
        })();
      })
    )
    .then(function () {
      process.exit();
    });
}

// export all methods
module.exports = {
  findRepo,
  listRepos,
  forceSyncFromCli,
};
