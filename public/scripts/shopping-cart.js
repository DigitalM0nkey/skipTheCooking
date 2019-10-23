
//Shopping cart functions
// const { sendMessage } = require('../../routes/send_sms');


$(document).ready(function() {
  const arr = [23.43, 45];

  //Order total listener

  //Calculate Order Helper
  const cartTotal = $('#cart-total')

  const calcTotal = function(array) {
    let total = 0;
    for (let ele in array) {
      total += array[ele];
    }
    return total;
  };
  cartTotal.text(calcTotal(arr));


  $(function() {
    const navTotal = $(".navTotal");
    if (arr.length === 0) {
      navTotal.hide();
    } else {
      navTotal.show();
    }
  });



  $("#pay").click(function() {
    $.post('/send_sms');
    alert('ORDER RECEIVED');
  });



});
