
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

  // let empty = function isEmpty(foodsObject) {
  //   tempvalue = false;
  //   for (var key in foodsObject) {
  //     if (foodsObject.hasOwnProperty(key))
  //       return false;
  //   }
  //   return true;
  // };

  // Display total in navbar
  const displayTotalInNav = () => {
    $(function() {
      const navTotal = $(".navTotal");
      if ($(".cart-total").text() === "") {
        navTotal.hide();
      } else {
        navTotal.show();
      }
    });
  };

  displayTotalInNav();

  // Send text message when pay button is clicked
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
  const calcTotal = function(foodsObject, array) {
    $('.cart-total').empty();
    let total = 0;
    displayTotalInNav();
    array.forEach(id => {
      const itemValue = foodsObject.find(e => {
        return String(e.id) === String(id)
      })
      total += itemValue.price
    })
    return $('.cart-total').text(total);
  };

  cartTotal = function(foodsObject, array) {

    if (array === undefined) {
      cartTotalTarget.text('0');
    } else {
      calcTotal(foodsObject, array);
    }
  };
  // loadProducts();
});

