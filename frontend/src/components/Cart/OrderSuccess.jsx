import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrderSucess from "../../images/ordersuccess.gif";
import MetaData from "../Utility/MetaData";

const OrderSuccess = () => {
  useEffect(() => {
    sessionStorage.removeItem("orderInfo");
    sessionStorage.removeItem("shipId");
  }, []);
  return (
   <>
    <MetaData title="Order Success" />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: {lg: "4rem 0", sm: "4rem 0", xs: "2rem 0"},
      }}
    >
      <Avatar src={OrderSucess} sx={{ width: {lg: "30%", sm: "60%", xs: "100%"}, height: {lg: "30%", sm: "60%", xs: "100%"} }} />

      <Link to="/user/orders" className="btn link">
        <Typography
          sx={{
            fontSize: "1.2rem",
            textAlign: "center",
            width: "100%",
            padding: "0.2rem 1rem",
            fontWeight: "bold",
          }}
        >
          View Orders
        </Typography>
      </Link>
    </Box>
   </>
  );
};

export default OrderSuccess;
