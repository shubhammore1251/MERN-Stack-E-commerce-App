const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/product");

exports.getOneProduct = catchAsyncErrors(async () => {
  await Product.findOne().limit(1);
  console.log(`cron job executed - ${new Date()}`);
});
