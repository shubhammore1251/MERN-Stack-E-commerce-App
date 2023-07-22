import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MetaData from "../Utility/MetaData";
import { Notify } from "../Utility/Notify";
import OrderDetails from "../Orders/OrderDetails";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrderErrors,
  getOrderDetails,
  updateOrderStatus,
} from "../../redux/actions/orderActions";
import { useParams } from "react-router-dom";
import { UPDATE_ORDER_RESET } from "../../redux/action-types/order";

const ProcessOrder = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const { order: { orderStatus } } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (updateError) {
      setBtnLoading(false);
      window.location.href = "/admin/orders";
      Notify("error", updateError);
      dispatch(clearOrderErrors());
    }

    if (isUpdated) {
      setBtnLoading(false);
      Notify("success", "Order status updated successfully!");
      dispatch(getOrderDetails(id));
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, updateError, isUpdated, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setBtnLoading(true);

    if (status === "") {
      Notify("error", "Provide the order status value to proceed!");
      setBtnLoading(false);
      return;
    }

    dispatch(updateOrderStatus(id, status));
  };

  return (
    <>
      <MetaData title={`Admin - Proccess Order #${"Id"}`} />
      <AdminNavbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box
       className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: { lg: orderStatus==="Delivered"? "center" : "space-between", sm: "center", xs: "center" },
          alignItems: "center",
          flexDirection: { lg: orderStatus==="Delivered"?"column": "row", sm: "column", xs: "column" },
        }}
      >
        <OrderDetails/>
        {orderStatus !== "Delivered" && (
          <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "50%", sm: "100%", xs: "100%" },
            height: { lg: "100vh", sm: "100%", xs: "100%" },
            borderLeft: { lg: "2px solid grey", sm: "none" },
            margin: "1rem 0"
          }}
        >
          <Typography
            sx={{
              marginTop: {lg: 8, sm: 5, xs: 0},
              fontSize: "1.2rem",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Update Order Status
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "60%",
            }}
          >
            <FormControl variant="filled" sx={{ width: "100%", marginTop: 2 }}>
              <InputLabel required id="demo-simple-select-filled-label">
                Choose Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="category"
                size="small"
                value={status}
                type="text"
                onChange={(e) => setStatus(e.target.value)}
              >
                {orderStatus === "Processing" && (
                  <MenuItem value="Shipped">Shipped</MenuItem>
                )}

                {orderStatus === "Shipped" && (
                  <MenuItem value="Delivered">Delivered</MenuItem>
                )}
              </Select>
            </FormControl>

            <LoadingButton
              type="submit"
              className="btn"
              loading={btnLoading}
              loadingPosition="center"
              sx={{
                fontWeight: "bold",
                mt: 3,
              }}
            >
              Process
            </LoadingButton>
          </Box>
        </Box>
        )}
      </Box>
    </>
  );
};

export default ProcessOrder;
