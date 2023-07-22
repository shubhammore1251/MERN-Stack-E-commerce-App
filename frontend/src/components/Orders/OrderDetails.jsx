import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../Utility/MetaData";
import { clearOrderErrors, getOrderDetails } from "../../redux/actions/orderActions";
import { Notify } from "../Utility/Notify";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import moment from "moment";
import Spinner from "../Utility/Spinner";
import { FormatPrice } from "../Utility/FormatPrice";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    order: {
      shippingInfo,
      paymentInfo,
      user,
      orderItems,
      totalPrice,
      createdAt,
      orderStatus,
    },
    error,
    loading,
  } = useSelector((state) => state.orderDetails);

  const fullAddress = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.country}, ${shippingInfo?.pinCode}`;

  const orderedDate = moment(createdAt).format("DD MMMM YYYY");

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href="/";
      dispatch(clearOrderErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      <MetaData title={`Order #${id}`} />

      {loading ? (
        <Spinner />
      ) : (
        <Box
          className="slide-in-blurred-left"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "1.8rem", sm: "1.5rem", xs: "0.9rem" },
              fontWeight: "bold",
              color: "rgb(7,133,121)",
            }}
          >
            Order #{id}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: {
                lg: "space-between",
                sm: "space-between",
                xs: "centre",
              },
              alignItems: "flex-start",
              flexDirection: { lg: "row", sm: "row", xs: "column" },
              margin: { lg: "2rem 0", sm: "2rem 0", xs: "2rem 0 0 0" },
              width: "90%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "rgb(7,133,121)",
                  textAlign: { lg: "left", sm: "left", xs: "center" },
                  width: "100%",
                }}
              >
                Shipping Info
              </Typography>

              <Typography variant="p" sx={{ marginTop: 2, fontSize: "1rem" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                  }}
                >
                  Name:
                </Typography>
                {user?.firstname} {user?.lastname}
              </Typography>

              <Typography variant="p" sx={{ mt: 2, fontSize: "1rem" }}>
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
                  width: { lg: "100%", sm: "80%", xs: "100%" },
                  lineHeight: "1.2rem",
                  fontSize: "1rem",
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
                {fullAddress}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: {
                  lg: "flex-end",
                  sm: "flex-end",
                  xs: "flex-start",
                },
                flexDirection: "column",
                width: "100%",
                margin: { lg: 0, sm: 0, xs: "2rem 0" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "rgb(7,133,121)",
                  textAlign: { lg: "right", sm: "right", xs: "center" },
                  width: "100%",
                }}
              >
                Payment Info
              </Typography>

              <Typography variant="p" sx={{ marginTop: 2, fontSize: "1rem" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                  }}
                >
                  Status:
                </Typography>
                {paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid"}
              </Typography>

              <Typography variant="p" sx={{ mt: 2, fontSize: "1rem" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                  }}
                >
                  Amount:
                </Typography>
                <FormatPrice price={totalPrice}/>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: { lg: "row", sm: "row", xs: "column" },
              margin: { lg: "2rem 0", sm: "2rem 0", xs: 0 },
              width: "90%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: { lg: "90%", sm: "90%", xs: "100%" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "rgb(7,133,121)",
                  textAlign: { lg: "left", sm: "left", xs: "center" },
                  width: "100%",
                  marginTop: { lg: 0, sm: 0, xs: 1 },
                }}
              >
                Order Placed On
              </Typography>

              <Typography variant="p" sx={{ marginTop: 2, fontSize: "1rem" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                  }}
                >
                  Date:
                </Typography>
                {orderedDate}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: {
                  lg: "flex-end",
                  sm: "flex-end",
                  xs: "flex-start",
                },
                flexDirection: "column",
                width: "100%",
                margin: { lg: 0, sm: 0, xs: "2rem 0" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "rgb(7,133,121)",
                  textAlign: { lg: "right", sm: "right", xs: "center" },
                  width: "100%",
                }}
              >
                Delivery Status
              </Typography>

              <Typography variant="p" sx={{ marginTop: 2, fontSize: "1rem" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "1rem" },
                  }}
                >
                  Status:
                </Typography>
                {orderStatus}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "90%",
              margin: { lg: "2rem 0", sm: "2rem 0", xs: "1rem 0" },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "rgb(7,133,121)",
                textAlign: { lg: "left", sm: "left", xs: "center" },
                width: "100%",
              }}
            >
              Order Items
            </Typography>
            {orderItems &&
              orderItems.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    boxShadow: "none",
                    margin: "1rem 0",
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
                      flexDirection: { lg: "row", sm: "row", xs: "column" },
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
                      {item.quantity} x {item.price} = <FormatPrice price={item.subtotal}/> 
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;
