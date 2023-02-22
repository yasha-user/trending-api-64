const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Repo = require("../models/Repo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var dateValue = "2023-01-01"; // setting default value
let dateValStr;

// changing dateValue
router.post("/dateval", (req, res) => {
  if (req.body.dateNewRepos) {
    var dateValue = req.body.dateNewRepos;

    console.log(req.body.dateNewRepos);
    res.redirect("/repos");
  } else if (req.body.dateNewDb) {
    var dateValue = req.body.dateNewDb;

    console.log(recieved);
    res.redirect("/repos/database");
  }
});

//
// here is request with the date
let url = `https://api.github.com/search/repositories?q=created:>${dateValue}&sort=stars&order=desc`; // url for request for repos created from 01-01-2023 up to today by default

router.get("/", (req, res) =>
  Repo.findAll()
    .then((repos) => {
      res.render("repos", { dateValue });
    })
    .catch((err) => console.log(err))
);

// get repos to database
router.post("/add", (req, res) => {
  let key = 0 ?? [];
  // let { byId, byName } = req.body;
  let recievedName;
  for (var name in req.body) {
    recievedName = name;
  }
  let errors = [];

  // here database is set and filled
  // for loop
  {
    fetch(url).then((response) =>
      response.json().then((data) => {
        if (recievedName === "all") {
          // here is database reset
          (async () => {
            await Repo.sync({ force: true });

            // here Repos are added one at a time
            for (let i = 0; i < data.items.length; i++) {
              console.log(` and the number is ${i + 1}`);
              Repo.create({
                item_id: data.items[i].id,
                item_name: data.items[i].name,
                full_name: data.items[i].full_name,
                stargazers_count: data.items[i].stargazers_count,
                description: data.items[i].description,
                html_url: data.items[i].html_url,
              })
                .then(console.log("Added"))
                .catch((err) => console.log(err));

              if (data.items.length - 1 === i) {
                console.log(dateValue);
                res.redirect("/repos");
              }
            }
          })();
        } else if (recievedName === "forceSync") {
          // here is database reset x2
          (async () => {
            await Repo.sync({ force: true });

            // here Repos are added one at a time
            for (let i = 0; i < data.items.length; i++) {
              console.log(` and the number is ${i + 1}`);
              Repo.create({
                item_id: data.items[i].id,
                item_name: data.items[i].name,
                full_name: data.items[i].full_name,
                stargazers_count: data.items[i].stargazers_count,
                description: data.items[i].description,
                html_url: data.items[i].html_url,
              })
                .then(console.log("Added"))
                .catch((err) => console.log(err));

              if (data.items.length - 1 === i) {
                console.log(dateValue);
                res.redirect("/repos/database");
              }
            }
          })();
        } else {
          res.send(`${recievedName}`);
          // if error or bug ^^it^^ prints name of button that caused error
        }
      })
    );
  }
});

// search by NAME or ID (renders database page with found repos instead of all)
router.get("/getrepos", (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();

  Repo.findAll({
    where: {
      [Op.or]: [
        { item_id: { [Op.like]: "%" + term + "%" } },
        { item_name: { [Op.like]: "%" + term + "%" } },
      ],
    },
  })
    // now database is rendered with repos that are found
    .then((newrepos) => res.render("database", { newrepos }))
    .catch((err) => console.log(err));
});

// gets database with designated Repos
router.get("/database", (req, res) => {
  Repo.findAll()
    .then((newrepos) => res.render("database", { newrepos, dateValue }))
    .catch((err) => console.log(err));
});

// get stringified JSON of first repo in trending
// you can press it to have a good feeling
router.get("/spell", (req, res) => {
  fetch(url).then((response) =>
    response.json().then((data) => {
      let key = 0 ?? [];
      newdata = JSON.stringify(data.items[key]);
      res.render("spell", { newdata });
    })
  );
});

module.exports = router;
