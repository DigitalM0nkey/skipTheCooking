
//Shopping cart functions
// const { sendMessage } = require('../../routes/send_sms');

// const cookieSession = require('cookie-session');



$(document).ready(function() {


  //Pay helper function
  $("#pay").click(function() {
    $.post('/send_sms');
  });

  //Shopping Basket =================
  //Load foods object from API
    const loadProducts = function() {
      $.get('/api/foods')
        .then(function(results) {
          renderShoppingCart(results.products, array);
          cartTotal(results.products, array);
        });
    };

    const renderShoppingCart = function(foodsObject, array) {
      array.forEach((element) => renderShoppingCartItem(foodsObject, element));
    }

    const renderShoppingCartItem = function(foodsObject, item) {
      let cart = $('.shopping-cart');
      let name = foodsObject[item].item_name;
      let price = foodsObject[item].price;

      const markup = `
        <article class="order">
          <div class="item">
            <h6>${name}</h6>
            <h6><i class="fad fa-dollar-sign"></i>${price}</h6>
            </div>
        </article>
        `
        return cart.prepend(markup);
      }
      //Calculate Order Helper
  let array = [1,2];
  const cartTotal = function(foodsObject, array) {

  const cartTotalTarget = $('#cart-total')

  if (array === null) {
    cartTotalTarget.text(0)
  } else {

    const calcTotal = function(array) {
      let total = 0;
      console.log("foodsObject: ", foodsObject)

      for (let ele in array) {
        console.log("calcTotal Array ele: ", array[ele])
        total += foodsObject[array[ele]].price;
      }
      return total;
      }
      cartTotalTarget.text(calcTotal(array));
    }
  };

    loadProducts();
});
