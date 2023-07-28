const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Repo = require("../models/Repo");
const Sequelize = require("sequelize");
const { response } = require("express");
const Op = Sequelize.Op;

secs = 0;
let neededMinutes = 5;

// function for interval
function intervalFunc() {
  if (secs === neededMinutes * 60) {
    // updates url value with new dateValue
    secs = 0;
    let url = `https://api.github.com/search/repositories?q=created:>${dateValue}&sort=stars&order=desc`;
    console.log(`Synchronization request is ${url}`);

    fetch(url, { dateValue }).then((response) =>
      response.json().then((data) => {
        // here is database reset x1
        (async () => {
          await Repo.sync({ force: true });
          // here Repos are added one at a time x1
          for (let i = 0; i < data.items.length; i++) {
            console.log(`SYNC ${i + 1}/30`);
            Repo.create({
              item_id: data.items[i].id,
              item_name: data.items[i].name,
              full_name: data.items[i].full_name,
              stargazers_count: data.items[i].stargazers_count,
              description: data.items[i].description,
              html_url: data.items[i].html_url,
            })
              // .then(console.log("Sync added"))
              .catch((err) => console.log(err));
            if (data.items.length - 1 === i) {
              console.log("SYNC COMPLETED!");
            }
          }
        })();
      })
    );
  }
}

// invoking of interval
setInterval(intervalFunc, 1000);

let dateValue = "2023-01-01"; // setting default value
// here is request with the date
let url = `https://api.github.com/search/repositories?q=created:>${dateValue}&sort=stars&order=desc`; // url for request for repos created from 01-01-2023 up to today by default

// changing dateValue
router.use("/dateval", (req, res, next) => {
  if (req.body.dateNewRepos) {
    dateValue = req.body.dateNewRepos; //passes new value into initial value
    console.log(req.body.dateNewRepos);
    next();
  } else if (req.body.dateNewDb) {
    dateValue = req.body.dateNewDb; //passes new value into initial value
    console.log(dateValue);
    next();
  }
});
router.post("/dateval", (req, res) => {
  let recievedName;
  for (var name in req.body) {
    recievedName = name;
  }
  // updates url value with new dateValue
  let url = `https://api.github.com/search/repositories?q=created:>${dateValue}&sort=stars&order=desc`;
  console.log(`request is ${url}`);
  // here database is set and filled
  secs = 0;
  {
    fetch(url, { dateValue }).then((response) =>
      response.json().then((data) => {
        if (recievedName === "dateNewRepos") {
          // here is database reset x2
          (async () => {
            await Repo.sync({ force: true });
            // here Repos are added one at a time x2

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
                .then(console.log(`repo ${i + 1} is added`))
                .catch((err) => console.log(err));
              if (data.items.length - 1 === i) {
                console.log(dateValue);
                res.redirect("/repos");
              }
            }
          })();
        } else if (recievedName === "dateNewDb") {
          // here is database reset x3
          (async () => {
            await Repo.sync({ force: true });
            // here Repos are added one at a time x3
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
                .then(console.log(`repo ${i + 1} is added`))
                .catch((err) => console.log(err));
              if (data.items.length - 1 === i) {
                console.log(dateValue);
                res.redirect("/repos/database");
              }
            }
          })();
        } else {
          res.send(`${recievedName}`);
          // if error then ^^it^^ prints name of button that caused error
        }
      })
    );
  }
});

// renders control page
router.get("/", (req, res) => res.render("repos", { dateValue }));

// get repos to database
router.post("/add", (req, res) => {
  let recievedName;
  for (var name in req.body) {
    recievedName = name;
  }
  // updates url value with new dateValue
  let url = `https://api.github.com/search/repositories?q=created:>${dateValue}&sort=stars&order=desc`;
  console.log(`request is ${url}`);

  // here database is set and filled
  {
    secs = 0;
    fetch(url, { dateValue }).then((response) =>
      response.json().then((data) => {
        if (recievedName === "all") {
          // here is database reset x4
          (async () => {
            await Repo.sync({ force: true });
            // here Repos are added one at a time x4
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
                .then(console.log(`repo ${i + 1} is added`))
                .catch((err) => console.log(err));
              if (data.items.length - 1 === i) {
                console.log(dateValue);

                res.redirect("/repos");
              }
            }
          })();
        } else if (recievedName === "forceSync") {
          // here is database reset x5

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
                .then(console.log(`repo ${i + 1} is added`))
                .catch((err) => console.log(err));
              if (data.items.length - 1 === i) {
                console.log(dateValue);
                res.redirect("/repos/database");
              }
            }
          })();
        } else {
          res.send(`${recievedName}`);
          // if error then ^^it^^ prints name of button that caused error
        }
      })
    );
  }
});

// fs from cli
router.post("/fsfromcli", (req, res) => {
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
        .then(console.log(`repo ${i + 1} is added`))
        .catch((err) => console.log(err));
      if (data.items.length - 1 === i) {
        console.log(dateValue);
        res.send(data);
      }
    }
  })();
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
    // now database is rendered with the repos that are found
    .then((newrepos) => res.render("database", { newrepos, dateValue }))
    .catch((err) => console.log(err));
});

// gets database with designated Repos
router.get("/database", (req, res) => {
  Repo.findAll()
    .then((newrepos) =>
      res.render("database", { newrepos, dateValue, url, layout: "ee" })
    )
    .catch((err) => console.log(err));
});

// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages

// gets database with designated Repos
router.get("/databasee", (req, res) => {
  Repo.findAll()
    .then((newrepos) =>
      res.render("databasee", { newrepos, dateValue, url, layout: "ee" })
    )
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

// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages
// easter egg pages

module.exports = { router, url, dateValue };
