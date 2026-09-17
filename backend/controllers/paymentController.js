const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { logEvent } = require("../utils/observability");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const startTime = Date.now();

  logEvent({
    event: "stripe_payment_started",
    req,
    data: {
      amount: req.body.amount,
      currency: "inr",
    },
  });

  try {
    const Payment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "ShopEasy-Ecommerce",
      },
    });

    logEvent({
      event: "stripe_payment_completed",
      req,
      data: {
        durationMs: Date.now() - startTime,
        paymentIntentId: Payment.id,
        amount: req.body.amount,
        currency: "inr",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: Payment.client_secret,
    });
  } catch (error) {
    logEvent({
      level: "error",
      event: "stripe_payment_failed",
      req,
      data: {
        durationMs: Date.now() - startTime,
        amount: req.body.amount,
        currency: "inr",
        errorType: error.type || null,
        errorCode: error.code || null,
        errorMessage: error.message,
      },
    });

    throw error;
  }
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY });
});
