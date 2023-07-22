import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderErrors, myOrders } from "../../redux/actions/orderActions";
import { Notify } from "../Utility/Notify";
import MetaData from "../Utility/MetaData";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormatPrice } from "../Utility/FormatPrice";
import SkeletonCard from "../Utility/SkeletonCard";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { userdata } = useSelector((state) => state.userData);

  const username = `${userdata?.firstname} ${userdata?.lastname}`;

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = "/";
      dispatch(clearOrderErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${username} - Orders`} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: { lg: "1rem 0", sm: "1rem 0" },
        }}
      >
        {orders && orders.length > 0 ? (
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Your Orders
          </Typography>
        ) : (
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            You Don't have any orders
          </Typography>
        )}
        <>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                margin: "1rem 0",
              }}
            >
              {[...Array(2)].map((i, index) => (
                <SkeletonCard key={index} vertical />
              ))}
            </Box>
          ) : (
            <>
              {orders.map((order) => (
                <Card
                  key={order._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "2rem 0",
                    width: { lg: "60%", sm: "80%", xs: "100%" },
                    boxShadow: "none",
                    border: "1px solid black",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#e8eaed",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        padding: { lg: "16px", sm: "16px", xs: "0 1px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "0.8rem",
                            sm: "0.8rem",
                            xs: "0.6rem",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Order #{order._id}
                      </Typography>

                      <Tooltip title="View Order Details">
                        <Link to={`/user/order/${order._id}`}>
                          <IconButton>
                            <OpenInNewIcon color="action" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </CardContent>

                    <CardContent>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: {
                            lg: "1rem",
                            sm: "1rem",
                            xs: "0.8rem",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Status: &nbsp;
                        <Typography
                          variant="span"
                          sx={{
                            color:
                              order.orderStatus === "Delivered"
                                ? "rgb(7,133,121)"
                                : "#e32932",
                          }}
                        >
                          {order.orderStatus}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "1rem",
                        margnTop: 2,
                        width: { lg: "80%", sm: "60%", xs: "70%" },
                      }}
                    >
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              margin: "0.8rem 0",
                            }}
                            key={item._id}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: { lg: "10%", sm: "15%", xs: "30%" },
                              }}
                              image={item.image}
                              alt={item.pname}
                            />

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <CardContent>
                                <Link
                                  className="link"
                                  to={`/product/${item.product}`}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "1rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.pname}
                                  </Typography>
                                </Link>
                                <Typography
                                  sx={{
                                    fontSize: { lg: "1.2rem", sm: "1rem" },
                                    fontWeight: "500",
                                  }}
                                >
                                  x{item.quantity}
                                </Typography>
                              </CardContent>
                            </Box>
                          </Box>
                        ))}
                    </Box>

                    <Typography
                      sx={{
                        width: { lg: "20%", sm: "40%", xs: "30%" },
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        letterSpacing: "2px",
                      }}
                    >
                      Total:
                      <br /> <FormatPrice price={order.totalPrice} />
                    </Typography>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </>
      </Box>
    </>
  );
};

export default MyOrders;
