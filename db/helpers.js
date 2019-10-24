
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
      db.end();
    });
  };



  const countArray = (cookie) => {
    let count = {};
    cookie.forEach(function(i) {
      count[i] = (Number(count[i]) || 0) + 1;
    });
    return count;
  };


  const getAllFoods = function() {
    return db.query(`SELECT * FROM foods;`)
      .then(data => {
        return data.rows;
      });
  };

  return { maxCookTime, getAllFoods, countArray };
};

