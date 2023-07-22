const User = require("../models/user");
const ShippingInfo = require("../models/shipping")
const Cart = require("../models/cart");;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");


//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale"
  });

  const { firstname, lastname, email, password } = req.body;

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    profilepic: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    token: user.getJWTToken(),
  });
});


//User Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user had given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  res.status(200).json({
    success: true,
    token: user.getJWTToken(),
  });
});



//Forgot Password
exports.forgotPasswordUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }

  //Get Reset Password Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.CLIENT_URL}/password/resetpassword/${resetToken}`;
  
  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email , then kindly ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `E-commerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});



//Reset Password
exports.resetPasswordUser = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password Token Invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    token: user.getJWTToken(),
  });
});



//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


//Update Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) =>{
  
  const user = await User.findById(req.user.id).select("+password");
  
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }
  
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  
  user.password = req.body.newPassword;
  
  await user.save();

  res.status(200).json({
    success: true,
  });
  
});


//Update USer Profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
   
  const newUserData ={
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  }

  if (req.body.avatar) {
    const user = await User.findById(req.user.id);

    const imageId = user.profilepic.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.profilepic = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new: true,
    runValidators: true,
    useFindandModify: true
  })

  res.status(200).json({
    success: true,
  })
});



//Get all Users --> admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
   
  const users = await User.find();
   
  res.status(200).json({
    success: true,
    users,
  });
});


//Get single User --> admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
   
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});


//Update USer Role
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{
   
  const newUserData ={
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new: true,
    runValidators: true,
    useFindandModify: true
  })

  res.status(200).json({
    success: true,
  })
});


//Delete a user --> admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
   
  let user = await User.findById(req.params.id);

  // let cart = await Cart.findOne({ user: req.params.id });

  if (!user){
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,404));
  }

  // if (cart) {
  //   const cart = await Cart.deleteOne({ user: req.params.id });
  // }

  const cart = await Cart.deleteOne({ user: req.params.id });

  const shippingInfo = await ShippingInfo.deleteMany({ user: req.params.id });


  const imageId = user.profilepic.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
    
  user = await User.findByIdAndRemove(req.params.id);
  
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  })
});