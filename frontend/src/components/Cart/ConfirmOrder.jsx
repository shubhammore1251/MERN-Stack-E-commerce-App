import React, { useEffect } from "react";
import MetaData from "../Utility/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../Utility/Notify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FormatPrice } from "../Utility/FormatPrice";
import {
  clearUserErrors,
  getSingleShippingInfo,
} from "../../redux/actions/userAction";
import Spinner from "../Utility/Spinner";
import { clearCartErrors } from "../../redux/actions/cartAction";

const ConfirmOrder = () => {
  const { userdata } = useSelector((state) => state.userData);

  const { cart, error: cartError } = useSelector((state) => state.getCart);

  const shipId = JSON.parse(sessionStorage.getItem("shipId"));

  const {
    shippingInfo,
    loading,
    error: shippingInfoError,
  } = useSelector((state) => state.getSingleShipInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleShippingInfo(shipId));
    
    if (shippingInfoError) {
      Notify("error", shippingInfoError);
      window.location.href = "/";
      dispatch(clearUserErrors());
    }

    if (cartError) {
      Notify("error", cartError);
      window.location.href = "/";
      dispatch(clearCartErrors());
    }
  }, [dispatch, shipId, shippingInfoError, cartError, navigate]);

  useEffect(() => {
    if (!cart || !shippingInfo) {
      navigate("/cart");
    }
  }, [shippingInfo, cart, navigate]);

  const subtotal = cart?.total;
  const shippingCharges = subtotal >= 699 ? 0 : 80;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <Box 
            className="slide-in-blurred-left"
            sx={{
              display: "flex",
              justifyContent: {
                lg: "space-between",
                sm: "center",
                xs: "center",
              },
              alignItems: { lg: "flex-start", sm: "center", xs: "center" },
              flexDirection: { lg: "row", sm: "column", xs: "column" },
              margin: { lg: "2rem", sm: "2rem 1rem", xs: "2rem 1rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: { lg: "flex-start", sm: "center", xs: "center" },
                flexDirection: "column",
                borderRight: {
                  lg: "3px solid #e2e5ed",
                  sm: "none",
                  xs: "none",
                },
                paddingLeft: { lg: "1rem", sm: "0", xs: "0" },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Shipping Info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  margin: "2rem 1rem",
                }}
              >
                <Typography variant="p">
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: "bold",
                      marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                    }}
                  >
                    Name:
                  </Typography>
                  {userdata?.firstname} {userdata?.lastname}
                </Typography>

                <Typography variant="p" sx={{ mt: 2 }}>
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: "bold",
                      marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                    }}
                  >
                    Phone No:
                  </Typography>
                  {shippingInfo?.phoneNumber}
                </Typography>

                <Typography
                  variant="p"
                  sx={{
                    mt: 2,
                    width: "100%",
                    lineHeight: "1.2rem",
                  }}
                >
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: "bold",
                      marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                    }}
                  >
                    Address:
                  </Typography>
                  {shippingInfo?.address}, {shippingInfo?.city},{" "}
                  {shippingInfo?.state}, {shippingInfo?.country},{" "}
                  {shippingInfo?.pinCode}
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Review items
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: { lg: "flex-start", sm: "center", xs: "center" },
                  flexDirection: "column",
                  width: "100%",
                  margin: "2rem 0",
                }}
              >
                {cart && cart.items && cart.items.length > 0 ? cart.items.map((item) => (
                      <Card
                        key={item._id}
                        sx={{
                          display: "flex",
                          width: "90%",
                          boxShadow: "none",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: { lg: "10%", sm: "10%", xs: "30%" },
                            height: "fit-content",
                            mt: 1,
                          }}
                          image={item?.image}
                          alt={item.pname}
                        />

                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: {
                              lg: "space-between",
                              sm: "space-between",
                              xs: "space-evenly",
                            },
                            alignItems: {
                              lg: "center",
                              sm: " center",
                              xs: "flex-start",
                            },
                            width: "100%",
                            fontWeight: "bold",
                            mt: 1,
                            flexDirection: {
                              lg: "row",
                              sm: "row",
                              xs: "column",
                            },
                          }}
                        >
                          <Typography component="div" variant="p">
                            {item.pname.length > 32
                              ? `${item.pname.slice(0, 32)}...`
                              : item.pname}
                          </Typography>

                          <Typography
                            component="div"
                            variant="p"
                            sx={{ fontWeight: "bold" }}
                          >
                            {item.quantity} x {item.price} = &nbsp;
                            <FormatPrice price={item.subtotal} />
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  : null}
              </Box>
            </Box>

            <Box
              sx={{
                width: {xl:"30", lg: "50%", sm: "100%", xs: "100%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: { lg: "2rem", sm: "2rem 0", xs: "2rem 0" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    lg: "1.8rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Order Summary
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  width: { lg: "100%", sm: "60%", xs: "80%" },
                  margin: "1rem 0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderTop: "3px solid #e2e5ed",
                    paddingTop: 2,
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    Subtotal:
                  </Typography>

                  <Typography variant="p">
                    <FormatPrice price={cart?.total} />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 4,
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    Shipping Charges:
                  </Typography>

                  <Typography variant="p">
                    <FormatPrice price={shippingCharges} />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 4,
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    Tax:
                  </Typography>

                  <Typography variant="p">
                    <FormatPrice price={tax} />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 4,
                    borderTop: "3px solid #e2e5ed",
                    paddingTop: 3,
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    Total:
                  </Typography>

                  <Typography variant="p">
                    <FormatPrice price={totalPrice} />
                  </Typography>
                </Box>

                <Button
                  size="medium"
                  sx={{
                    fontweight: "bold",
                    fontSize: "0.8rem",
                    width: "100%",
                    mt: 3
                  }}
                  className="btn"
                  onClick={proceedToPayment}
                >
                  Proceed To Payment
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </>
    </>
  );
};

export default ConfirmOrder;
