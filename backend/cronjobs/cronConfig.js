const { getOneProduct } = require("./cronFunctions");

module.exports = [
  {
    schedule: "*/10 * * * *",
    job: getOneProduct,
  },
];