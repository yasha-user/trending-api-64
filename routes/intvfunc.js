const { dateValue, url } = require("./newrepos");

{
  dateValue, url;
}
let secs = 0;
let neededMinutes = 5;

// function for interval
module.exports = function intervalFunc() {
  console.log(`second ${secs}`);
  secs++;
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
              .then(console.log("Sync added"))
              .catch((err) => console.log(err));
            if (data.items.length - 1 === i) {
              console.log("SYNC COMPLETED!");
            }
          }
        })();
      })
    );
  }
};
// invoking of interval
setInterval(intervalFunc, 1000);
