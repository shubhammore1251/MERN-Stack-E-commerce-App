const ShippingInfo = require("../models/shipping");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create a new shippingInfo
exports.createShippingInfo = catchAsyncErrors(async (req, res, next) => {
  const { address, city, state, country, pinCode, phoneNumber } = req.body;

  let shippingInfo = await ShippingInfo.find({ user: req.user._id });

  if (shippingInfo.length === 2) {
    return next(new ErrorHandler("You cannot add more than 2 address", 400));
  }

  shippingInfo = await ShippingInfo.create({
    user: req.user._id,
    address,
    city,
    state,
    country,
    pinCode,
    phoneNumber,
  });

  res.status(201).json({
    success: true,
  });
});

//get shippping information
exports.getShippingInfo = catchAsyncErrors(async (req, res) => {
  const shippingInfo = await ShippingInfo.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    shippingInfo,
  });
});

exports.getSingleShippingInfo = catchAsyncErrors(async (req, res) => {
  const shippingInfo = await ShippingInfo.findById(req.params.id);
  
  res.status(200).json({
    success: true,
    shippingInfo,
  });
});

//delete shipping Information
exports.deleteShippingInfo = catchAsyncErrors(async (req, res, next) => {
  let shippingInfo = await ShippingInfo.findById(req.params.id);

  if (!shippingInfo) {
    return next(new ErrorHandler("ShippingInfo Not Found", 404));
  }

  shippingInfo = await ShippingInfo.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
  });
});
