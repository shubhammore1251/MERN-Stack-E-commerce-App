const Cart = require("../models/cart");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Add items to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // If cart doesn't exist, create a new cart for the user
    cart = new Cart({ user: req.user._id, items: [], total: 0 });
  }

  // Check if the product already exists in the cart
  const existingItemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (existingItemIndex !== -1) {
    // If the product already exists, update the quantity and subtotal
    const existingItem = cart.items[existingItemIndex];
    const newQuantity = existingItem.quantity + quantity;

    // Retrieve the product document separately and populate the product field
    const product = await Product.findById(existingItem.product);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    if (newQuantity > product.stock) {
      return next(
        new ErrorHandler(
          "Insufficient Stock! You Already have some quantity of this item in cart",
          400
        )
      );
    }

    existingItem.quantity = newQuantity;
    existingItem.subtotal = newQuantity * product.price;
    existingItem.stock = product.stock;

    // existingItem.subtotal = existingItem.quantity * product.price;
  } else {
    // If the product doesn't exist, add a new cart item
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    if (quantity > product.stock) {
      return next(new ErrorHandler("Insufficient Stock", 400));
    }

    const subtotal = quantity * product.price;
    cart.items.push({
      product: productId,
      pname: product.pname,
      price: product.price,
      image: product.images[0].url,
      quantity,
      subtotal,
      stock: product.stock,
    });
  }
  // Update the total price of the cart
  const { total, totalQuantity } = calculateCartTotal(cart.items);

  cart.total = total;
  cart.totalQuantity = totalQuantity;
  // Save the updated cart
  await cart.save();

  res.status(200).json({ success: true });
});

//get user cart items
exports.getCartItems = catchAsyncErrors(async (req, res) => {
  const cartItems = await Cart.findOne({ user: req.user._id });

  if (cartItems) {
    const productIds = cartItems.items.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } });

    // Update cart items with current stock values
    cartItems.items.forEach((item) => {
      const product = products.find((product) =>
        product._id.equals(item.product)
      );
      if (product) {
        item.stock = product.stock;
      }
    });

    // Remove products that are no longer available
    const updatedItems = cartItems.items.filter((item) =>
      products.some((product) => product._id.equals(item.product))
    );

    const { total, totalQuantity } = calculateCartTotal(updatedItems);

    cartItems.items = updatedItems;
    cartItems.total = total;
    cartItems.totalQuantity = totalQuantity;

    await cartItems.save();
  }
  res.status(200).json({
    success: true,
    cartItems,
  });
});

//Update quantity
exports.updateQuantity = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHandler(`Cart with userId: ${req.user._id} not found`, 404));
  }

  const existingItem = cart.items.find((item) =>
    item.product.equals(productId)
  );

  if (existingItem) {
    // Update the quantity
    existingItem.quantity = quantity;

    // Retrieve the product document separately and populate the product field
    const product = await Product.findById(existingItem.product);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    existingItem.subtotal = existingItem.quantity * product.price;

    // Update the total price of the cart
    const { total, totalQuantity } = calculateCartTotal(cart.items);

    cart.total = total;
    cart.totalQuantity = totalQuantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
    });
  } else {
    return next(new ErrorHandler("Item not found in the cart", 404));
  }
});

//delete cart items
exports.deleteCartItems = catchAsyncErrors(async (req, res, next) => {
  const {productId} = req.body;

  let cart = await Cart.findOne({user: req.user._id});

  if (!cart) {
    return next(new ErrorHandler(`Cart with userId: ${req.user._id} Not Found`, 404));
  }
  
  const existingItemIndex = cart.items.findIndex((item) =>
  item.product.toString() === productId
  );


  if (existingItemIndex !== -1) {
    // Remove the item from the cart items array
    cart.items.splice(existingItemIndex, 1);

    // Update the total price of the cart
    const { total, totalQuantity } = calculateCartTotal(cart.items);
    cart.total = total;
    cart.totalQuantity = totalQuantity;

    // Save the updated cart
    await cart.save();

    // Check if the items array is empty
    if (cart.items.length === 0) {
      // Delete the cart if it is empty
      await Cart.deleteOne({ user: req.user._id });

      return res.status(200).json({
        success: true,
        message: "Item successfully removed from cart. Cart is now empty.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item successfully removed from cart",
    });
  } else {
    return next(new ErrorHandler("Item not found in the cart", 404));
  }
});

//clear whole cart
exports.clearCart = catchAsyncErrors(async (req, res, next) => {

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHandler(`Cart with userId: ${req.user._id} Not Found`, 404));
  }

  cart = await Cart.deleteOne({ user: req.user._id });

  res.status(200).json({ success: true, message: "Cart deleted successfully" });
});

// Function to calculate the total price of the cart
const calculateCartTotal = (items) => {
  let total = 0;
  let totalQuantity = 0;

  items.forEach((item) => {
    // Add the subtotal of each item to the total
    total += item.subtotal;

    // Add the quantity of each item to the total quantity
    totalQuantity += item.quantity;
  });

  return {
    total,
    totalQuantity,
  };
};
