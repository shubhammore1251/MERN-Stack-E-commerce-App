const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ShippingInfo = require("../models/shipping");

//Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;



  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get Single Order - Admin
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "firstname lastname email")

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    orders,
  });
});

//get All Orders - Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status - Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with Id: ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already Delivered this order", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//delete Order - Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with Id: ${req.params.id}`, 404)
    );
  }

  order = await Order.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
