
//Shopping cart functions


let renderShoppingCart;

let renderShoppingCartItem = function(foodsObject, item) {
  item = item - 1; //call the correct object element

  let cart = $('.shopping-cart-container');
  if (!foodsObject[item].item_name) {
    console.log(`foodsObject[item].item_name problem. item: ${item}, foodsObject[item]: ${foodsObject}[item]`);
  }
  let name = foodsObject[item].item_name;
  let price = foodsObject[item].price;

  const markup = `
    <article class="order">
      <div class="item">
       <h6>${name}</h6>
       <h6>$${price}</h6>
        </div>
    </article>
    `
  return cart.prepend(markup);
};

let cartTotal;


$(document).ready(function() {

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

  renderShoppingCart = function(foodsObject, cart) {
    $('.shopping-cart-container').empty();
    cart.forEach((element, i) => {
      if (!cart || cart.length === 0) {
        console.log('Cart is undefined or zero:', cart)
      }
      renderShoppingCartItem(foodsObject, cart[i]);
    });
  };

  //Calculate Order Helper
  const calcTotal = function(foodsObject, array) {
    $('.cart-total').empty();
    let total = 0;
    displayTotalInNav();
    array.forEach(id => {
      const itemValue = foodsObject.find(e => {
        return String(e.id) === String(id);
      })
      total += itemValue.price;
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

