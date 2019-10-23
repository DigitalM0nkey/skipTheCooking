// const server = require('../server');

// const foodQuery = () => {
//   server.db.query('SELECT * FROM foods;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     server.db.end();
//   });
// }
// exports.foodQuery = foodQuery;


/**
 * Add a order to the database.
 * @param {{food_id: int, order_id: int, qty: int}} ordered_items
 * @return {Promise<{}>} A promise to the user.
//  */
const orderedItems = function(ordereds_items) {
  const text = 'INSERT INTO ordered_items(food_id, order_id,qty) VALUES($1, $2, $3) RETURNING *';
  const values = [ordered_items.food_id, ordered_items.order_id, ordered_items.qty];
  return db.query(text, values)
    .then(res => res.rows[0])
    .catch(err => console.log('OH NO orderedItems ', err.stack)
    );
};
exports.orderedItems = orderedItems;


