

//Shopping cart functions

$(document).ready(function() {

  //Order total listener
  // const $cart = $('.shopping-cart');
  const cartTotal = $('#cart-total')
  const arr = [1,2]

  const calcTotal = function(array) {
    let total = 0;
    for (let ele in array) {
      total += array[ele];
    }
    return total;
  }
  cartTotal.text(calcTotal(arr));
});
