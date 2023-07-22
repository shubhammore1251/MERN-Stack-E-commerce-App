import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Typography } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { FormatPrice } from "../Utility/FormatPrice";
import { Link } from "react-router-dom";
import MetaData from "../Utility/MetaData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import { allOrders } from "../../redux/actions/orderActions";
import { getAllUsers } from "../../redux/actions/userAction";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  let totalAmount = 0;

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(allOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineData = {
    labels: ["Initial Earnings", "Amount Earned"],
    datasets: [
      {
        label: "Total Earnings",
        data: [0, totalAmount],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "ShopEasy Earnings",
      },
    },
  };

  const doughnutData = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: "#Stock",
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <MetaData title="Admin Dashboard" />
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
          Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: {lg:"row", md: "row", sm: "column", xs: "column"},
            width: "100%",
            margin: "2rem 1rem",
            textAlign: "center",
          }}
        >
          <Box
            className="dashboard-card"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "1rem",
              width: {lg:"15%", md: "20%", sm: "40%", xs: "80%"},
              borderTop: "3px solid black",
              borderRadius: "2px",
              transition: "ease-in 0.8s",
              "&:hover": {
                transform: "translateY(-0.5rem)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Earnings
            </Typography>
            <Typography
              variant="h6"
              sx={{ padding: 1, letterSpacing: "1px", fontWeight: "600" }}
            >
              <FormatPrice price={totalAmount} />
            </Typography>
          </Box>

          <Box
            className="dashboard-card"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "1rem",
              width: {lg:"15%", md: "20%", sm: "40%", xs: "80%"},
              borderTop: "3px solid rgb(7,133,121)",
              borderRadius: "2px",
              transition: "ease-in 0.8s",
              "&:hover": {
                transform: "translateY(-0.5rem)",
              },
            }}
          >
            <Link to="/admin/products" className="link">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Products
              </Typography>
              <Typography variant="h6" sx={{ padding: 1, fontWeight: "600" }}>
                {products && products.length}
              </Typography>
            </Link>
          </Box>

          <Box
            className="dashboard-card"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "1rem",
              width: {lg:"15%", md: "20%", sm: "40%", xs: "80%"},
              borderTop: "3px solid rgb(7,133,121)",
              borderRadius: "2px",
              transition: "ease-in 0.8s",
              "&:hover": {
                transform: "translateY(-0.5rem)",
              },
            }}
          >
            <Link to="/admin/orders" className="link">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Orders
              </Typography>
              <Typography variant="h6" sx={{ padding: 1, fontWeight: "600" }}>
                {orders && orders.length}
              </Typography>
            </Link>
          </Box>

          <Box
            className="dashboard-card"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "1rem",
              width: {lg:"15%", md: "20%", sm: "40%", xs: "80%"},
              borderTop: "3px solid black",
              borderRadius: "2px",
              transition: "ease-in 0.8s",
              "&:hover": {
                transform: "translateY(-0.5rem)",
              },
            }}
          >
            <Link to="/admin/users" className="link">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Users
              </Typography>
              <Typography variant="h6" sx={{ padding: 1, fontWeight: "600" }}>
              {users && users.length}
              </Typography>
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            width: { lg: "70%", sm: "70%", xs: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Line options={options} data={lineData} />
        </Box>

        <Box
          sx={{
            width: { lg: "40%", sm: "40%", xs: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Doughnut data={doughnutData} />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
