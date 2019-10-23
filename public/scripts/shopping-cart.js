
//Shopping cart functions


let renderShoppingCart;

let renderShoppingCartItem = function(foodsObject, item) {
  item = item - 1; //call the correct object element

  let cart = $('.shopping-cart-container');
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
};

let cartTotal;


$(document).ready(function() {

  let empty = function isEmpty(foodsObject) {
    tempvalue = false;
    for (var key in foodsObject) {
      if (foodsObject.hasOwnProperty(key))
        return false;
    }
    return true;
  };

  // Pay Helper

  $(function() {
    const navTotal = $(".navTotal");
    if (empty) {
      navTotal.hide();
    } else {
      navTotal.show();
    }
  });


  $("#pay").click(function() {
    $.post('/send_sms');
    alert('ORDER RECEIVED');
  });

  //Shopping Basket =================
  //Load foods object from API
  // const loadProducts = function() {
  //   $.get('/api/foods')
  //     .then(function(results) {
  //       renderShoppingCart(results.products, array);
  //       cartTotal(results.products, array);
  //     });
  // };

  renderShoppingCart = function(foodsObject, cart) {
    $('.shopping-cart-container').empty();
    cart.forEach((element) => {
      renderShoppingCartItem(foodsObject, cart[element - 1]);
    });
  }

  //Calculate Order Helper

  cartTotal = function(foodsObject, array) {
    console.log("cartTotal array: ", array);

    const cartTotalTarget = $('#cart-total');

    if (array === null) {
      cartTotalTarget.text(0);
    } else {

      const calcTotal = function(array) {
        let total = 0;
        console.log("foodsObject: ", foodsObject);

        for (let ele in array) {
          console.log("calcTotal Array ele: ", array[ele]);
          total += foodsObject[array[ele]].price;
        }
        return total;
      };
      // cartTotalTarget.text(calcTotal(array));
    }
  };
  // loadProducts();
});


