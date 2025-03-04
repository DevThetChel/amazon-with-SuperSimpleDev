import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import { cart } from "../data/cart-class.js";
// import "../data/backend-practice.js";

new Promise((resolve) => {
  console.log("Promise");
  resolve();
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
