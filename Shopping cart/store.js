if (document.readyState == "loading") {
  document.addEventListener("DOMContenetLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemsButton = document.querySelectorAll(".btn-danger");
  for (let i = 0; i < removeCartItemsButton.length; i++) {
    let button = removeCartItemsButton[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInput = document.querySelectorAll(".cart-quantity-input");
  for (let i = 0; i < removeCartItemsButton.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", changed);
  }

  let addToCartButton = document.querySelectorAll(".shop-item-button");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCart);
  }

  document
    .querySelector(".btn-purchase")
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("thank you for you purchase");
  let cartitems = document.querySelectorAll(".cart-items")[0];
  while (cartitems.hasChildNodes()) {
    cartitems.removeChild(cartitems.firstChild);
  }
  updateCartTotal();
}

function addToCart(event) {
  let button = event.target;
  let shopitem = button.parentElement.parentElement;
  let title = shopitem.querySelector(".shop-item-title").innerHTML;
  let price = shopitem.querySelector(".shop-item-price").innerHTML;
  let imageScr = shopitem.querySelector(".shop-item-image").src;
  addItemToCart(title, price, imageScr);
  updateCartTotal();
}

function addItemToCart(title, price, imageScr) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  let cartItemsTitel = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemsTitel.length; i++) {
    if (cartItemsTitel[i].innerHTML == title) {
      alert();
      return;
    } else {
    }
  }
  let cartRowContent = ` 
  <div class="cart-item cart-column">
  <img
    class="cart-item-image"
    src=${imageScr}
    width="100"
    height="100"
  />
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="2" />
  <button class="btn btn-danger" type="button">REMOVE</button>
</div>
`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", changed);
}

function changed(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".cart-items");
  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.querySelector(".cart-price");
    let quantityElement = cartRow.querySelector(".cart-quantity-input");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = parseFloat(quantityElement.value);
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerHTML = `$${total}`;
}
