// load .env data into process.env
require("dotenv").config({ silent: true });
//const data = require('./db/database');

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["goddog"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// PG database client/connection setup
const { Client } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Client(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const cart = require("./routes/cart");
const foodsRoutes = require("./routes/foods");
const sendSms = require("./routes/sendSms");
const helper = require("./db/helpers")(db);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/foods", foodsRoutes(db));
app.use("/api/cart", cart(db));

// Note: mount other resources here, using the same pattern above

// app.post("/send_sms", () => {
//   sendSms.sendMessage();
// });

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  if (req.session.user_id === undefined) {
    req.session.user_id = 2;
  }
  helper
    .getAllFoods()
    .then((data) => {
      let myCart = req.session.cart || [];
      const calcTotal = helper.calcTotal(data, myCart);
      res.render("index", {
        cart: myCart,
        products: data,
        calcTotal: calcTotal,
      });
    })
    .catch((err) => console.log("error in the index file oh dear", err));
});

app.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`skipTheCooking app listening on port ${PORT}`);
});
