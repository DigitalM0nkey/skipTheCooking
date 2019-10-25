const express = require('express');
const router = express.Router();


module.exports = (db) => {
  const helper = require("../db/helpers")(db);
  router.get("/", (req, res) => {
    console.log("getting foods")
    helper.getAllFoods()
      .then((products) => res.json({ products }))
      .catch((err) => console.log("FOOD ERROR OH NO", err));
  });
  return router;
};

