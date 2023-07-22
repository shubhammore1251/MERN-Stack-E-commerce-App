const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// get All products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    products,
  });
});


//Get Detail of Single Product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


//Create a Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
   
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// Update Product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  
  const updatedProduct = {
    pname: req.body.pname,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
  }
  // Images Start Here
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  if (req.body.images && req.body.images.length > 0) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    updatedProduct.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, updatedProduct , {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


//Delete Product - Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  product = await Product.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});


// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  
  const {rating,comment,productId} = req.body;

  const review ={
    user: req.user._id,
    name: `${req.user.firstname} ${req.user.lastname}`,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);
  
  const isReviewed = product.reviews.find(rev=> rev.user.toString()=== req.user._id.toString())

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  }else{
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  
  let sum=0;

  product.reviews.forEach((review) => {
    sum+=review.rating;
  })

  product.ratings = sum / product.reviews.length;
  
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


//Get All Reviews
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  });

});


//Delete Reviews
exports.deleteProductReviews = catchAsyncErrors(async (req,res,next)=>{

  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  
  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

  let sum=0;

  reviews.forEach((review) => {
    sum+=review.rating;
  })

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  }else{
    ratings = sum / reviews.length;
  }

  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numberOfReviews
  },{
    new: true,
    runValidators: true,
    useFindandModify: false
  })

  res.status(200).json({
    success: true,
  });

});
