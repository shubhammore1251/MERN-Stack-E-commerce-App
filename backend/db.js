const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.DB_PROD_URL).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

module.exports = connectToMongo;
