const express = require("express");
const {
  addToCart,
  getCartItems,
  deleteCartItems,
  updateQuantity,
  clearCart,
} = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/cart/clearall").delete(isAuthenticatedUser, clearCart);

router
  .route("/cart")
  .get(isAuthenticatedUser, getCartItems)
  .post(isAuthenticatedUser, addToCart)

  router
  .route("/cart/update")
  .put(isAuthenticatedUser, updateQuantity)

  router
  .route("/cart/deleteitem")
  .delete(isAuthenticatedUser, deleteCartItems);

module.exports = router;
