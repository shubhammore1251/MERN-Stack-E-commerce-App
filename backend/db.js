const mongoose = require("mongoose");

const DATABASE_URL =
  process.env.NODE_ENV === "PRODUCTION"
    ? process.env.DB_PROD_URL
    : process.env.DB_URL;

const connectToMongo = () => {
  mongoose.connect(DATABASE_URL).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

module.exports = connectToMongo;