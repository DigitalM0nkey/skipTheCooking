
let products = {};

$(document).ready(function() {

  // AJAX GET /products
  const loadProducts = function() {
    $.get('/api/foods')
      .then(function(results) {
        renderProducts(results.products)
        products = results.products;
      });
  };

  // place all products from db onto main page

  const renderProducts = function(products) {
    products.forEach(item => {
      const el = createProductElement(item);

      $('.product-container').append(el)
      $(`#${item.id}.shopping-add`).click(() => addItemToCart(item.id)) //event handler for each card
    });
  };
  // Create individual products
  const createProductElement = function(product) {
    const $product = $("<article>").addClass("all-products");

    const image_url = product.image_url;
    const item_name = product.item_name;
    const price = product.price;
    const description = product.description;
    // <i class="fad fa-heart"></i>  storing heart from HTML

    const markup = `
    <section class="product-card" >
      <div class="image">
      <img src=${image_url} width="100%">
    </div>
      <article>
      <header>
        <div class="title">
        ${item_name}
        </div>
        <div class="price">
          $${price}
        </div>
      </header>
      <div class="description">
        <p>${description}</p>
      </div>
    </article>
    <div>
      <footer>
        <!-- FOOTER -->
        <div>

          <div id="${product.id}" class="shopping-add" >
          Add item to cart: <i class="fad fa-shopping-cart" > </i>
          </div>
        </div>
      </footer>
    </div>
    </section>
    `;



    $($product).append(markup);
    return $product;
  };


  $(function() {
    const rb = $(".rb");
    const lb = $(".lb");
    //const clickable = $(".clickable");
    $(".button").on("click", function() {
      if (!rb.is(":visible")) {
        rb.show();
        // lb.show();
      } else {
        rb.hide();
        lb.hide();
      }
    });
  });


  // // AJAX POST /products
  // $('.new-product-form').submit(function(event) {
  //   const data = $(this).serialize();
  //   event.preventDefault();
  //   if (data === "text=" || !$(this[form = "text"]).val().trim()) {
  //     errorMessages('empty');
  //     return false;
  //   } else if ($(this[form = "text"]).val().length > 140) {
  //     errorMessages('full');
  //     return false;
  //   } else {
  //     $.ajax({
  //       method: "POST",
  //       url: '/products',
  //       data: data,
  //     })
  //       .then(() => {
  //         loadProduct();
  //         $(this)[0].reset();
  //         const counter = $(this).find(".counter");
  //         $(counter).html(140);
  //       })
  //       .fail(() => {
  //         errorMessages('broken');
  //         console.log("NOOOOOOOO!");
  //       });
  //   }
  // });

  loadProducts();

  const addItemToCart = function(itemId) {
    let shoppingCart = {
      itemId: [itemId]
    };

    $.post('/addToCart', shoppingCart, (response) => {
      console.log(response);
    })
      .then((response) => {
        renderShoppingCart(products, response.cart);
      });
    // .then((response) => cartTotal(products, response))
  };
});
