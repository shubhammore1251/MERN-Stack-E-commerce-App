import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../Utility/MetaData";
import TableList from "./TableList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  allOrders,
  clearOrderErrors,
  deleteOrder,
} from "../../redux/actions/orderActions";
import { Notify } from "../Utility/Notify";
import { DELETE_ORDER_RESET } from "../../redux/action-types/order";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormatPrice } from "../Utility/FormatPrice";
import Spinner from "../Utility/Spinner";
import DialogBox from "./DialogBox";

function createData(value1, value2, value3, value4, value5) {
  return { value1, value2, value3, value4, value5 };
}

const headers = {
  value1: "Order ID",
  value2: "Status",
  value3: "Order Item Qty",
  value4: "Amount",
  value5: "Actions",
};

const OrdersList = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, orders, loading } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [btnLoading, setBtnLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteIt, setDeleteIt] = useState("No");

  const [orderId, setOrderId] = useState("");

  const rows = [];

  const handleDialogClose = () => {
    setDialogOpen(false);
    setBtnLoading(false);
    setOrderId("");
    setDeleteIt("No");
  };

  const handleYes = () => {
    setDeleteIt("Yes");
    setDialogOpen(false);
  };

  const deleteOrderHandler = (id) => {
    setBtnLoading(true);
    setDialogOpen(true);
    setOrderId(id);
  };

  useEffect(() => {
    if (error) {
      Notify("error", error);
      dispatch(clearOrderErrors());
      window.location.href = "/admin/orders";
    }

    if (deleteError) {
      Notify("error", deleteError);
      dispatch(clearOrderErrors());
      window.location.href = "/admin/orders";
    }

    if (isDeleted) {
      Notify("success", "Order Deleted Successfully");
      setBtnLoading(false);
      navigate("/admin/orders");
      setOrderId("");
      setDeleteIt("No");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(allOrders());

  }, [dispatch, error, deleteError, navigate, isDeleted]);

  useEffect(() => {
    if (orderId && deleteIt === "Yes") {
      dispatch(deleteOrder(orderId));
    }
  }, [dispatch, orderId, deleteIt]);


  orders &&
    orders.forEach((item) => {
      const actions = (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Link to={`/admin/order/${item._id}`} className="link">
            <EditIcon
              sx={{
                "&:hover": {
                  color: "#f29e0c",
                },
              }}
            />
          </Link>

          <LoadingButton
            onClick={() => deleteOrderHandler(item._id)}
            loading={btnLoading}
            loadingPosition="center"
          >
            {!btnLoading && (
              <DeleteIcon
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            )}
          </LoadingButton>
        </Box>
      );

      const totalPrice = <FormatPrice price={item.totalPrice} />;
      rows.push(
        createData(
          item._id,
          item.orderStatus,
          item.orderItems.length,
          totalPrice,
          actions
        )
      );
    });

  return (
    <>
      <MetaData title="Admin - All Orders" />
      <AdminNavbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box
        className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2rem 0",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "600", letterSpacing: "2px" }}
        >
          All Orders
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: "1rem",
            }}
          >
            <TableList rows={rows} headers={headers} />
          </Box>
        )}

        <DialogBox
          dialogOpen={dialogOpen}
          handleDialogClose={handleDialogClose}
          handleYes={handleYes}
          deleteText="Delete Order"
        />
      </Box>
    </>
  );
};

export default OrdersList;
