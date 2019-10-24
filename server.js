// load .env data into process.env
require('dotenv').config();
//const data = require('./db/database');

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const async = require('async');

app.use(cookieSession({
  name: 'session',
  keys: ["goddog"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// PG database client/connection setup
const { Client } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Client(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const foodsRoutes = require("./routes/foods");
const sendSms = require("./routes/sendSms");
const helper = require("./db/helpers");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/foods", foodsRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
//app.use("/send_sms", sendSms.sendMessage());
// Note: mount other resources here, using the same pattern above

app.post("/send_sms", () => {
  sendSms.sendMessage();
});
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/login/:id', (req, res) => {

  req.session.user_id = req.params.id;
  res.redirect('/');
});



app.post('/checkout', (req, res) => {
  // This returns an ID#
  const newOrderId = createOrder(req.session.user_id)
    .then(resultOfCreateOrder => {
      console.log(resultOfCreateOrder);
      orderedItems(resultOfCreateOrder.rows[0].id, req.session.cart);
    })
    .catch(err => console.log('OH NO orderedItems ', err.stack)
    );
  // This takes in the id from the other function
  //orderedItems(newOrderId.id, req.session.cart);

});

// console.log('newOrderId = ', newOrderId);
// console.log("herro", req.session.cart);
// console.log("req Session", req.session);




app.post("/addToCart", (req, res) => {
  if (req.session.cart === undefined) {
    req.session.cart = req.body.itemId;
  } else {
    let cart = req.session.cart.concat(req.body.itemId);
    req.session.cart = cart;
  }
  console.log("req session after all funcs: ", req.session.cart);
  res.json({ "cart": req.session.cart });
});

app.get("/clear-cart", (req, res) => {
  console.log("clear cart now!")
  console.log("cart before clear", req.session.cart);
  req.session.cart = [];
  res.redirect("/");
  console.log("cart after clear", req.session.cart);
});

app.listen(PORT, () => {
  console.log(`skipTheCooking app listening on port ${PORT}`);
});

//DATBASE CALLS

// const foodQuery = () => {
//   db.query('SELECT * FROM foods;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     db.end();
//   });
// };

//foodQuery();

const createOrder = function(userID) {
  const text = `INSERT INTO orders(user_id, timestamp) VALUES(${userID},  NOW()) RETURNING id`;
  return db.query(text);
};

//createOrder(3);

const sendToDatabase = (foodId, orderId, qty) => {
  let queryText = `INSERT INTO ordered_items(food_id,order_id,qty) VALUES(${parseInt(foodId)},${orderId},${qty}) RETURNING id;`;
  console.log("quesryText = ", queryText);

  return db.query(queryText);

};


const orderedItems = function(orderId, cookie) {
  let cookieObj = helper.countArray(cookie);
  console.log("cookieOBJ = ", cookieObj);

  let promises = [];

  for (const foodId in cookieObj) {
    let std = sendToDatabase(foodId, orderId, cookieObj[foodId]);
    promises.push(std);
    std.then(res => console.log("rows = ", res.rows[0]));
  }

  Promise.all(promises)
    .then(() => {
      console.log("Promises complete");
    })
    .catch(err => console.log('OH NO orderedItems ', err.stack));
};




//orderedItems(3, ['1', '1', '3', '5', '5']);
