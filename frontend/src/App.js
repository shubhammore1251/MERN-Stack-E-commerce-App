import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import Profile from "./components/User/Profile";
import Auth from "./components/ProtectedRoute/Auth";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import { Notify } from "./components/Utility/Notify";
import { clearCartErrors, getCart } from "./redux/actions/cartAction";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import { Container } from "@mui/material";
import axios from "axios";
import Payment from "./components/Cart/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import CreateProduct from "./components/Admin/CreateProduct";
import ProductsList from "./components/Admin/ProductsList";
import UsersList from "./components/Admin/UsersList";
import Reviews from "./components/Admin/Reviews";
import OrdersList from "./components/Admin/OrdersList";
import UpdateProduct from "./components/Admin/UpdateProduct";
import ProcessOrder from "./components/Admin/ProcessOrder";
import NotFound from "./components/NotFound";
import useAnimation from "./components/Utility/useAnimation";
import Cookies from 'js-cookie';

const Layout = ({ children,userdata, showAnimation }) => {
  return (
    <>
      <Navbar userdata={userdata} showAnimation={showAnimation}/>
      {children}
      <Footer />
    </>
  );
};

function App() {
 
  const dispatch = useDispatch();

  const { userdata, isAuthenticated } = useSelector((state) => state.userData);

  const { error } = useSelector((state) => state.getCart);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const [triggerAnimation, setTriggerAnimation] = useState(false)

  const showAnimation = useAnimation({triggerAnimation, setTriggerAnimation});

  async function getStripeApiKey() {
    const config = {
      headers: {
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/stripeapikey`, config);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      getStripeApiKey();
    }
  }, [dispatch,isAuthenticated]);

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = `/`;
      dispatch(clearCartErrors());
    }

    if (userdata?._id) {
      dispatch(getCart());
      setTriggerAnimation(true);
    }
  }, [dispatch, error, userdata]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          padding: { lg: 0, sm: 0, xs: 0 },
          minHeight: "calc(100vh - 188px)",
          marginTop: {lg: "12vh", sm: "12vh", xs: "10vh"}
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Layout userdata={userdata} showAnimation={showAnimation}>
                <Home />
              </Layout>
            }
          />

          <Route
            exact
            path="/products"
            element={
              <Layout userdata={userdata} showAnimation={showAnimation}>
                <Products />
              </Layout>
            }
          />

          <Route
            exact
            path="/product/:id"
            element={
              <Layout userdata={userdata} showAnimation={showAnimation}> 
                <ProductDetails setTriggerAnimation={setTriggerAnimation}/>
              </Layout>
            }
          />

          <Route exact path="/signup" element={<SignUp />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="*" element={<NotFound />} />

          <Route
            exact
            path="/password/forgotpassword"
            element={<ForgotPassword />}
          />

          <Route
            exact
            path="/password/resetpassword/:token"
            element={<ResetPassword />}
          />

          <Route
            exact
            path="/cart"
            element={
              <Layout userdata={userdata} showAnimation={showAnimation}>
                <Cart setTriggerAnimation={setTriggerAnimation}/>
              </Layout>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  <Profile />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/shipping"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  <Shipping />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <Layout userdata={userdata}>
                <Auth userdata={userdata}>
                  <ConfirmOrder />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/process/payment"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  {stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  )}
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/success"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  <OrderSuccess />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/user/orders"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  <MyOrders />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/user/order/:id"
            element={
              <Layout userdata={userdata}>
                <Auth>
                  <OrderDetails />
                </Auth>
              </Layout>
            }
          />

          <Route
            exact
            path="/admin/dashboard"
            element={
              <Auth isAdminComp={true}>
                <Dashboard />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <Auth isAdminComp={true}>
                <ProductsList />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/product/:id"
            element={
              <Auth isAdminComp={true}>
                <UpdateProduct />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/product/create"
            element={
              <Auth isAdminComp={true}>
                <CreateProduct />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/users"
            element={
              <Auth isAdminComp={true}>
                <UsersList />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/orders"
            element={
              <Auth isAdminComp={true}>
                <OrdersList />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/order/:id"
            element={
              <Auth isAdminComp={true}>
                <ProcessOrder />
              </Auth>
            }
          />

          <Route
            exact
            path="/admin/reviews"
            element={
              <Auth isAdminComp={true}>
                <Reviews />
              </Auth>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
