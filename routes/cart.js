
const express = require('express');
const router = express.Router();
const sendSms = require("../routes/sendSms");

module.exports = (db) => {

  const helper = require("../db/helpers")(db);


  router.post('/checkout', (req, res) => {
    // This returns an order ID#
    console.log("req.session.user_id", req.session.user_id);
    createOrder(req.session.user_id)
      .then(resultOfCreateOrder => {
        let phone = req.body.pn;
        orderedItems(resultOfCreateOrder.rows[0].id, req.session.cart, phone, () => {
          req.session.cart = [];
          res.redirect('/');
        });
      })
      .catch(err => console.log('OH NO checkout ', err.stack)
      );
  });

  router.post("/addToCart", (req, res) => {
    if (req.session.cart === undefined) {
      req.session.cart = req.body.itemId;
    } else {
      let cart = req.session.cart.concat(req.body.itemId);
      req.session.cart = cart;
    }
    res.json({ "cart": req.session.cart });
  });

  router.get("/clear-cart", (req, res) => {
    req.session.cart = [];
    res.redirect("/");
  });

  const createOrder = function(userID) {
    const text = `INSERT INTO orders(user_id, timestamp) VALUES(${userID},  NOW()) RETURNING id;`;
    return db.query(text);
  };


  const sendToDatabase = (foodId, orderId, qty) => {
    let queryText = `INSERT INTO ordered_items(food_id,order_id,qty) VALUES(${parseInt(foodId)},${orderId},${qty}) RETURNING id;`;

    return db.query(queryText);

  };

  const orderedItems = function(orderId, cookie, phoneNumber, cb) {
    let cookieObj = helper.countArray(cookie);

    let promises = [];

    for (const foodId in cookieObj) {
      let std = sendToDatabase(foodId, orderId, cookieObj[foodId]);
      promises.push(std);
      std.then(res => console.log("rows = ", res.rows[0]));
    }

    Promise.all(promises)
      .then(() => {

        sendSms.sendMessage(sendSms.orderReceivedMessageStore(orderId));
        helper.maxCookTime(orderId).then((cookTime) => {
          cb();
          sendSms.sendMessage(sendSms.orderReceivedMessageClient(cookTime.rows[0].max), phoneNumber);

        });
      })
      .catch(err => console.log('OH NO orderedItems ', err.stack));
  };

  return router;
};
