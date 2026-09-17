const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
var cors = require("cors");
const { rateLimit } = require('express-rate-limit');

const {
  generateRequestId,
  logEvent,
} = require("./utils/observability");

// Config
require("dotenv").config({ path: "./config/config.env" });


app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-ecom-site.netlify.app"],
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);

// Enable trust proxy
app.set('trust proxy', 1);

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP, please try again after a minute",
    status: 429
  }
});

// Create a write stream (in append mode)
const LOG_DIR = path.join(__dirname, "logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(LOG_DIR, "access.log"),
  { flags: "a" }
);


app.use((req, res, next) => {
  req.requestId = generateRequestId();

  const startTime = Date.now();

  res.on("finish", () => {
    logEvent({
      level: res.statusCode >= 500 ? "error" : "info",
      event: "http_request_completed",
      req,
      data: {
        statusCode: res.statusCode,
        durationMs: Date.now() - startTime,
      },
    });
  });

  next();
});

app.use(limiter);

app.use(logger("combined", {
  stream: accessLogStream
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//routes
const productsRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const shippingRoute = require("./routes/shippingRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1", productsRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", shippingRoute);
app.use("/api/v1", paymentRoute);

app.get("/", (req, res) => {
  res.send(`<html><h1>shopEasy Ecommerce backend</h1></html>`);
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
