
module.exports = (db) => {
  const maxCookTime = (orderId) => {
    return db.query(`
        SELECT MAX(cook_time)
        FROM foods
        JOIN ordered_items ON food_id = foods.id
        WHERE order_id = ${orderId}`, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log('JSON.stringify(row):', JSON.stringify(row));
      }
      // db.end();
    });
  };

  const countArray = (cookie) => {
    let count = {};
    cookie.forEach(function(i) {
      count[i] = (Number(count[i]) || 0) + 1;
    });
    return count;
  };


  const calcTotal = function(foodsObject, cart) {
    let total = 0;
    //displayTotalInNav();
    cart.forEach(id => {
      const itemValue = foodsObject.find(e => {
        return String(e.id) === String(id);
      });
      total += itemValue.price;
    });
    return total;
  };


  const getAllFoods = function() {
    return db.query(`SELECT * FROM foods;`)
      .then(data => {
        return data.rows;
      })
      .catch((err) => { console.log("caught an error in all foods:", err) });
  };

  return { maxCookTime, getAllFoods, countArray, calcTotal };
};

