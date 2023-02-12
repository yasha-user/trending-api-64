const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Repo = require("../models/Repo");

router.get("/", (req, res) =>
  Repo.findAll()
    .then((repos) => {
      res.render("repos", { repos });
    })
    .catch((err) => console.log(err))
);

const url =
  "https://api.github.com/search/repositories?q=created:>2023-02-01&sort=stars&order=desc"; // for repos created from 02-01 up to today
const ghurl = "gh api /search/repositories?q=Q";
const curl_url = `curl -G https://api.github.com/search/repositories --data-urlencode "sort:stars" --data-urlencode "order:desc" --data-urlencode "q=created:>2023-02-01"`; // for repos created from 02-01 up to today

// get repos to database

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  let key = 0 ?? [];
  let { byId, byName } = req.body;
  let recievedName;
  for (var name in req.body) {
    recievedName = name;
  }
  let errors = [];

  if (recievedName === "byId" && !byId) {
    errors.push({ text: "insert id" });
  }
  if (recievedName === "byName" && !byName) {
    errors.push({ text: "insert name" });
  }
  if (errors.length > 0) {
    res.render("add", {
      errors,
      byId,
      byName,
    });
  } else {
    fetch(url).then((response) =>
      response.json().then((data) => {
        if (recievedName === "first") {
          console.log(` and the name is ${recievedName}`);
          Repo.create({
            item_id: data.items[key].id,
            item_name: data.items[key].name,
            full_name: data.items[key].full_name,
            description: data.items[key].description,
            html_url: data.items[key].html_url,
          })
            .then(res.redirect("/repos"))
            .then(console.log("Added first!"))
            .catch((err) => console.log(err));
          return;
        } /* here i need async but i have a for loop */ else if (
          recievedName === "all"
        ) {
          for (let i = 0; i < data.items.length; i++) {
            console.log(` and the number is ${i + 1}`);
            Repo.create({
              item_id: data.items[i].id,
              item_name: data.items[i].name,
              full_name: data.items[i].full_name,
              description: data.items[i].description,
              html_url: data.items[i].html_url,
            })
              .then(console.log("Added"))
              .catch((err) => console.log(err));

            if (data.items.length - 1 === i) {
              res.redirect("/repos");
            }
          }
        } else if (recievedName === "byId") {
          // console.log(` and the req body iiiiis ${JSON.stringify(req.body)}`);
          console.log(` and the name is ${recievedName}`);
          Repo.create({
            item_id: data.items[key].id,
            item_name: data.items[key].name,
            full_name: data.items[key].full_name,
            description: data.items[key].description,
            html_url: data.items[key].html_url,
          })
            .then(res.redirect("/repos"))
            .then(console.log("Added 1!"))
            .catch((err) => console.log(err));
          return;
        } else if (recievedName === "byName") {
          console.log(` and the name is ${recievedName}`);
          Repo.create({
            item_id: data.items[key].id,
            item_name: data.items[key].name,
            full_name: data.items[key].full_name,
            description: data.items[key].description,
            html_url: data.items[key].html_url,
          })
            .then(res.redirect("/repos"))
            .then(console.log("Added 1!"))
            .catch((err) => console.log(err));
          return;
        } else {
          res.send(`${recievedName}`);
        }
      })
    );
  }
});

router.get("/database", (req, res) => {
  Repo.findAll()
    .then((newrepos) => res.render("database", { newrepos }))
    .catch((err) => console.log(err));
});

// get stringified JSON of first repo in trending
router.get("/spell", (req, res) => {
  fetch(url).then((response) =>
    response.json().then((data) => {
      let key = 0 ?? [];
      newdata = JSON.stringify(data.items[key]);
      res.render("spell", { newdata });
    })
  );
});

// get JSON of first repo in trends
router.get("/getfirst", (req, res) => {
  let key = 0 ?? [];
  fetch(url).then((response) =>
    response.json().then((data) => {
      /* 
      if (String(`${data.items[key].id}`) == String(req.params.id))
        res.send(
          String(
            `Indeed repo #${data.items[key].id} is what you was searching for`
          )
        );
      else  */ {
        res.send(data.items[key]);
      }
    })
  );
});

module.exports = router;
