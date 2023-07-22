import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Utility/MetaData";
import Spinner from "../Utility/Spinner";
import { Avatar, Box, Button, Typography } from "@mui/material";
import CartCard from "./CartCard";
import { Notify } from "../Utility/Notify";
import { clearCartErrors, getCart } from "../../redux/actions/cartAction";
import {
  REMOVE_CART_ITEM_RESET,
  UPDATE_CART_RESET,
} from "../../redux/action-types/cart";
import EmptyCartImg from "../../images/empty-cart.svg";
import { useNavigate } from "react-router-dom";
import { FormatPrice } from "../Utility/FormatPrice";

const Cart = ({ setTriggerAnimation }) => {
  const { loading, cart, error } = useSelector((state) => state.getCart);

  const {
    error: UpdateOrDeleteError,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.userData);

  const allStockAvailable = cart?.items?.every((item) => item.stock >= 1);

  const [btnLoading, setBtnLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = "/";
      dispatch(clearCartErrors());
    }

    if (UpdateOrDeleteError) {
      Notify("error", UpdateOrDeleteError);
      setBtnLoading(false);
      window.location.href = "/cart";
      dispatch(clearCartErrors());
    }

    if (isUpdated) {
      Notify("success", "Cart Updated");
      dispatch(getCart(userdata?._id));
      setTriggerAnimation(true);
      dispatch({ type: UPDATE_CART_RESET });
    }

    if (isDeleted) {
      dispatch(getCart(userdata?._id));
      dispatch({ type: REMOVE_CART_ITEM_RESET });
      setTriggerAnimation(true);
      setBtnLoading(false);
      Notify("success", "Item Deleted successfully!");
    }
  }, [
    dispatch,
    error,
    userdata,
    isUpdated,
    UpdateOrDeleteError,
    isDeleted,
    setTriggerAnimation,
  ]);

  const handleCheckOut = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title="ShopEasy User Cart" />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {cart?.items?.length > 0 && cart ? (
              <Box
                className="slide-in-blurred-left"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: {lg:"flex-start", md: "flex-start", sm: "center", xs: "center"},
                  flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
                  margin: "1rem",
                }}
              >
                <Box
                  className="cart-card"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: {
                      lg: "2rem 4rem",
                      sm: "2rem 2rem",
                      xs: "2rem 0rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.5rem", sm: "1.5rem", xs: "1.2rem" },
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      marginTop: "1rem",
                    }}
                  >
                    Your Cart ( {cart.totalQuantity}{" "}
                    {cart.totalQuantity > 1 ? "Item's" : "Item"})
                  </Typography>

                  {cart.items &&
                    cart.items.map((item) => (
                      <CartCard
                        productName={item.pname}
                        image={item.image}
                        productId={item.product}
                        cartId={cart._id}
                        userId={userdata._id}
                        quantity={item.quantity}
                        stock={item.stock}
                        price={item.price}
                        dispatch={dispatch}
                        key={item._id}
                        btnLoading={btnLoading}
                        setBtnLoading={setBtnLoading}
                      />
                    ))}

                  {allStockAvailable && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                        borderTop: "1px solid #d9d8d4",
                        margin: "2rem 0",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          marginRight: "1rem",
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                          marginTop: "1.2rem",
                        }}
                      >
                        Subtotal:
                        <Typography variant="span" sx={{ fontWeight: "400" }}>
                          &nbsp;
                          <FormatPrice price={cart.total} />
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    width: { xl: "30%", lg: "50%", md: "40%", sm: "80%", xs: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: {
                      lg: "2rem",
                      sm: "2rem 0rem",
                      xs: "2rem 0rem",
                    },
                    height: "fit-content",
                    padding: "1rem",
                  }}
                  className="checkout-box"
                >
                  {allStockAvailable ? (
                    <>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { lg: "1.2rem", sm: "1rem" },
                          marginTop: "1.2rem",
                        }}
                      >
                        Subtotal:
                        <Typography variant="span" sx={{ fontWeight: "400" }}>
                          &nbsp;
                          <FormatPrice price={cart.total} />
                        </Typography>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { lg: "1rem", sm: "1rem" },
                          marginTop: "1rem",
                          width: "80%",
                          lineHeight: "1.5rem",
                          color: "red",
                        }}
                      >
                        One of the product in your cart is Out of Stock please
                        remove it to proceed further.
                      </Typography>
                    </>
                  )}

                  <Button
                    className="btn"
                    sx={{
                      marginTop: "1rem",
                      width: "50%",
                      fontSize: { lg: "0.8rem", sm: "0.6rem", xs: "0.8rem" },
                    }}
                    disabled={!allStockAvailable}
                    onClick={handleCheckOut}
                  >
                    CheckOut
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                {loading ? (
                  <Spinner />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      margin: "2rem 0",
                    }}
                  >
                    <Avatar
                      src={EmptyCartImg}
                      alt="empty-cart"
                      sx={{
                        width: { lg: "30%", sm: "50%", xs: "80%" },
                        height: "100%",
                      }}
                    />
                    <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                      Your Cart is Empty!
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default Cart;
