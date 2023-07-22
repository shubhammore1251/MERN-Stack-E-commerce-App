const express = require("express");
const {
  createShippingInfo,
  getShippingInfo,
  deleteShippingInfo,
  getSingleShippingInfo,
} = require("../controllers/shippingController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

//create /add shippingInfo

router
  .route("/shippingInfo/create")
  .post(isAuthenticatedUser, createShippingInfo);
  
router.route("/user/shippingInfo").get(isAuthenticatedUser, getShippingInfo);

router
  .route("/user/shippingInfo/:id")
  .get(isAuthenticatedUser, getSingleShippingInfo)
  .delete(isAuthenticatedUser, deleteShippingInfo);

module.exports = router;
