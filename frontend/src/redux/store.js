import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { addReviewReducer, createProductReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducer/productReducer";
import { allUsersReducer, forgotPasswordReducer, getSingleShippingInfoReducer, getUserDetailsReducer, profileReducer, shippingInfoReducer, userReducer } from "./reducer/userReducer";
import { addToCartReducer, cartReducer, getCartReducer } from "./reducer/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "./reducer/orderReducer";


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    userData: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    addToCart: addToCartReducer,
    getCart: getCartReducer,   
    cart: cartReducer, 
    shippingInfo: shippingInfoReducer,
    getSingleShipInfo: getSingleShippingInfoReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    addReview: addReviewReducer,
    createProduct: createProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    allUsers: allUsersReducer,
    getUser: getUserDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;