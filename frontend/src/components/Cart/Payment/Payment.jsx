import React, { useEffect, useRef } from "react";
import "./Payment.css";
import MetaData from "../../Utility/MetaData";
import CheckOutSteps from "../CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Notify } from "../../Utility/Notify";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCart, clearCartErrors } from "../../../redux/actions/cartAction";
import { clearOrderErrors, createOrder } from "../../../redux/actions/orderActions";
import Spinner from "../../Utility/Spinner";
import { clearUserErrors, getSingleShippingInfo } from "../../../redux/actions/userAction";
import Cookies from "js-cookie";

const Payment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  
  const shipId = JSON.parse(sessionStorage.getItem("shipId"));

  const { cart, loading: cartLoad, error: cartError } = useSelector((state) => state.getCart);

  const { shippingInfo, loading, error: shippingInfoError } = useSelector((state) => state.getSingleShipInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { userdata } = useSelector((state) => state.userData);
  const { error } = useSelector((state) => state.newOrder);
  

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href="/";
      dispatch(clearOrderErrors());
    }

    dispatch(getSingleShippingInfo(shipId));

    if (shippingInfoError) {
      Notify("error", shippingInfoError);
      window.location.href="/";
      dispatch(clearUserErrors());
    }

    if (cartError) {
      Notify("error", cartError);
      window.location.href="/";
      dispatch(clearCartErrors());
    }
    
  }, [dispatch, error,cartError,shippingInfoError,shipId]);


  useEffect(() => {
    if (!cart || !shippingInfo) {
      navigate("/cart");
    }
  }, [shippingInfo, cart, navigate]);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };
  
  const order = {
    shippingInfo,
    orderItems: cart?.items,
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "ecom_tkn": Cookies.get('ecom_tkn'),
        },
      }
      
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${userdata?.firstname} ${userdata?.lastname}`,
            email: userdata?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        Notify("error", result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
          dispatch(clearCart(userdata?._id));
        } else {
          Notify("error", "There's some issue while processing payment")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Notify("error", error.response.data.message)
    }
  };

  

  return (
    <>
      <MetaData title="Payments" />
      <CheckOutSteps activeStep={2} />
      <>
      {loading || cartLoad ? (
        <Spinner/>
      )
      :(
        <div className="paymentContainer slide-in-blurred-left">
        <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹ ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          >
          </input>  
        </form>
      </div>
      )
      }
      </>
    </>
  );
};

export default Payment;
