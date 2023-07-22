const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const Payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ShopEasy-Ecommerce",
    },
  });

  res.status(200).json({ success: true, client_secret: Payment.client_secret });
});



exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ success: true, stripeApiKey : process.env.STRIPE_API_KEY });
})