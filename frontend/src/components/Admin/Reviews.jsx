import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Box, TextField, Typography } from "@mui/material";
import MetaData from "../Utility/MetaData";
import Spinner from "../Utility/Spinner";
import TableList from "./TableList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearProductErrors,
  deleteProductReviews,
  getProductReviews,
} from "../../redux/actions/productsAction";
import { Notify } from "../Utility/Notify";
import { DELETE_REVIEW_RESET } from "../../redux/action-types/product";

function createData(value1, value2, value3, value4, value5) {
  return { value1, value2, value3, value4, value5 };
}

const headers = {
  value1: "Review ID",
  value2: "User",
  value3: "Comment",
  value4: "Rating",
  value5: "Actions",
};

const Reviews = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [productId, setProductId] = useState("");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getProductReviews(productId));
    }
    if (error) {
      Notify("error", error);
      dispatch(clearProductErrors());
    }

    if (deleteError) {
      Notify("error", deleteError);
      dispatch(clearProductErrors());
    }

    if (isDeleted) {
      setBtnLoading(false);
      Notify("success", "Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

  const deleteReviewHandler = (reviewId) => {
    setBtnLoading(true);
    dispatch(deleteProductReviews(productId, reviewId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    dispatch(getProductReviews(productId));
    setBtnLoading(false);
  };

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      const actions = (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <LoadingButton
            onClick={() => deleteReviewHandler(item._id)}
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

      rows.push(
        createData(item._id, item.name, item.comment, item.rating, actions)
      );
    });
  return (
    <>
      <MetaData title="Admin - All Reviews" />
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
          variant="h5"
          sx={{ fontWeight: "600", letterSpacing: "2px" }}
        >
          Product Reviews
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: { lg: "25%", sm: "80%", xs: "90%" },
                mt: 2,
                mb: 5,
              }}
            >
              <TextField
                autoComplete="product-Id"
                name="Product ID"
                required
                fullWidth
                id="productId"
                label="Enter Product ID"
                type="text"
                autoFocus
                size="small"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />

              <LoadingButton
                type="submit"
                className="btn"
                loading={btnLoading}
                loadingPosition="center"
                sx={{
                  margin: "1rem 0",
                  fontWeight: { lg: "bold", sm: "800", xs: "700" },
                }}
              >
                Search
              </LoadingButton>
            </Box>
            <TableList rows={rows} headers={headers} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Reviews;
