import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import TableList from "./TableList";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductErrors,
  deleteProduct,
  getAllProducts,
} from "../../redux/actions/productsAction";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../Utility/MetaData";
import { FormatPrice } from "../Utility/FormatPrice";
import { Notify } from "../Utility/Notify";
import { DELETE_PRODUCT_RESET } from "../../redux/action-types/product";
import Spinner from "../Utility/Spinner";
import DialogBox from "./DialogBox";

function createData(value1, value2, value3, value4, value5) {
  return { value1, value2, value3, value4, value5 };
}

const headers = {
  value1: "Product ID",
  value2: "Name",
  value3: "Stock",
  value4: "Price",
  value5: "Actions",
};

const AdminProducts = () => {
  const [open, setOpen] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, products, loading } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteIt, setDeleteIt] = useState("No");

  const [productId, setProductId] = useState("");

  const rows = [];

  useEffect(() => {
    if (error) {
      Notify("error", error);
      dispatch(clearProductErrors());
      window.location.href = "/admin/products";
    }

    if (deleteError) {
      Notify("error", deleteError);
      dispatch(clearProductErrors());
      window.location.href = "/admin/products";
    }

    if (isDeleted) {
      Notify("success", "Product Deleted Successfully");
      setBtnLoading(false);
      navigate("/admin/products");
      setProductId("");
      setDeleteIt("No");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAllProducts());
  }, [dispatch, deleteError, error, isDeleted, navigate]);

  useEffect(() => {
    if (productId && deleteIt === "Yes") {
      dispatch(deleteProduct(productId));
    }
  }, [dispatch, productId, deleteIt]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setBtnLoading(false);
    setProductId("");
    setDeleteIt("No");
  };

  const handleYes = () => {
    setDeleteIt("Yes");
    setDialogOpen(false);
  };

  const deleteProductHandler = (id) => {
    setBtnLoading(true);
    setDialogOpen(true);
    setProductId(id);
  };

  products &&
    products.forEach((item) => {
      const actions = (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Link to={`/admin/product/${item._id}`} className="link">
            <EditIcon
              sx={{
                "&:hover": {
                  color: "#f29e0c",
                },
              }}
            />
          </Link>

          <LoadingButton
            onClick={() => deleteProductHandler(item._id)}
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

      const price = <FormatPrice price={item.price} />;
      rows.push(createData(item._id, item.pname, item.stock, price, actions));
    });

  return (
    <>
      <MetaData title="Admin - All Products" />
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
          All Products
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
          deleteText="Delete Product"
        />
      </Box>
    </>
  );
};

export default AdminProducts;
