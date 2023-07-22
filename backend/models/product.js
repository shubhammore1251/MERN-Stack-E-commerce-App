const mongoose = require("mongoose");

const product = new mongoose.Schema({
  pname: {
    type: String,
    required: [true, "Please Enter a Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter a Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter a Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter  product Stock"],
    maxLength: [8, "Stock cannot exceed 8 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", product);
