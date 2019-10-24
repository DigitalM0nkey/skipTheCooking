const express = require('express');
const router = express.Router();


module.exports = (db) => {
  const helper = require("../db/helpers")(db);
  router.get("/", (req, res) => {
    helper.getAllFoods()
      .then((products) => res.json({ products }));
  });
  return router;
};

