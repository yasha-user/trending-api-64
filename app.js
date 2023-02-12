const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// checking the connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

const app = express();

// handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    // handlebars: allowInsecurePrototypeAccess(exphbs),
  })
);
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// landing page
app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

// repos page
app.use("/repos", require("./routes/newrepos"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
