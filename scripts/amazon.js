import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsURL()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-${product.id}">
              <option  value="1" selected >1</option>
              <option value="2">2</option>
              <option  value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>  
            
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart-button button-primary"
          data-product-id="${product.id}"
          >Add to Cart</button>
        </div>
  `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

updateCartQuantity();

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

const addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart-button ").forEach((button) =>
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    const selectElement = document.querySelector(`.js-quantity-${productId}`);

    const quantity = Number(selectElement.value);

    addToCart(productId, quantity);
    updateCartQuantity();

    const addedElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedElement.classList.add("show-added");

    const previousId = addedMessageTimeouts[productId];

    if (previousId) {
      clearTimeout(previousId);
    }

    const timeOutId = setTimeout(() => {
      addedElement.classList.remove("show-added");
    }, 2000);

    addedMessageTimeouts[productId] = timeOutId;
  })
);
