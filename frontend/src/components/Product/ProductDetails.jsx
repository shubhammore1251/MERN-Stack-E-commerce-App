import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addAReview,
  clearProductErrors,
  getProductDetails,
} from "../../redux/actions/productsAction";
import MetaData from "../Utility/MetaData";
import { Box, Button, Rating, Typography, useMediaQuery } from "@mui/material";
import PagingCarousel from "../Carousels/PagingCarousel";
import Spinner from "../Utility/Spinner";
import FormSelect from "../Utility/FormSelect";
import CenterModeCarousel from "../Carousels/CenterModeCarousel";
import { Notify } from "../Utility/Notify";
import ReviewCard from "./ReviewCard";
import { addToCart, clearCartErrors } from "../../redux/actions/cartAction";
import ReviewModalComp from "./ReviewModal";
import { ADD_NEW_REVIEW_RESET } from "../../redux/action-types/product";
import { clearUserErrors } from "../../redux/actions/userAction";
import { FormatPrice } from "../Utility/FormatPrice";
import { ADD_TO_CART_RESET } from "../../redux/action-types/cart";
import LoadingButton from "@mui/lab/LoadingButton";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const [slidesToShow, setSlidesToShow] = useState(3);

  const [sliceLength, setSliceLength] = useState(265);

  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");

  const [rating, setRating] = useState(0);

  const [btnLoading, setBtnLoading] = useState(false);

  const isXtraSmallScreen = useMediaQuery("(max-width: 720px)");

  const isSmallScreen = useMediaQuery(
    "(min-width: 721px) and (max-width: 899px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width: 900px) and (max-width: 1200px)"
  );

  const dispatch = useDispatch();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.userData);

  const { success, error: addToCartError } = useSelector(
    (state) => state.addToCart
  );

  const { success: addReviewSuccess, error: reviewError } = useSelector(
    (state) => state.addReview
  );

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = "/";
      dispatch(clearProductErrors());
    }

    dispatch(getProductDetails(id));

    if (addToCartError) {
      Notify("error", addToCartError);
      setBtnLoading(false);
      window.location.href = `/product/${id}`;
      dispatch(clearCartErrors());
    }

    if (success) {
      Notify("success", "Product added to cart !");
      window.location.reload();
      dispatch({ type: ADD_TO_CART_RESET });
    }

    if (reviewError) {
      Notify("error", reviewError);
      window.location.href = `/product/${id}`;
      dispatch(clearUserErrors());
    }

    if (addReviewSuccess) {
      Notify("success", "Review Submitted Successfully")
      setBtnLoading(false);
      dispatch({ type: ADD_NEW_REVIEW_RESET });
    }
  }, [
    dispatch,
    error,
    id,
    success,
    addReviewSuccess,
    reviewError,
    addToCartError,
  ]);

  useEffect(() => {
    if (isMediumScreen) {
      setSlidesToShow(3);
      setSliceLength(200);
    } else if (isSmallScreen) {
      setSlidesToShow(2);
      setSliceLength(220);
    } else if (isXtraSmallScreen) {
      setSlidesToShow(1);
      setSliceLength(210);
    } else {
      setSlidesToShow(3);
      setSliceLength(265);
    }
  }, [isXtraSmallScreen, isSmallScreen, isMediumScreen]);

  const addProductToCart = () => {
    setBtnLoading(true);
    dispatch(addToCart(id, parseInt(quantity, 10)));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReview("");
    setRating(0);
  };

  const handleSubmit = () => {
    if (review === "") {
      Notify("error", "Please provide a review");
      return;
    }

    const reviewData = {
      productId: id,
      comment: review,
      rating,
    };

    dispatch(addAReview(reviewData));
    setReview("");
    setRating(0);
    setOpen(false);
  };

  return (
    <>
      <MetaData
        title={product.pname ? `${product?.pname} - ${id}` : `Product - ${id}`}
      />

      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              className="slide-in-blurred-left"
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: { lg: "2rem 4rem", sm: "1rem" },
                flexDirection: { lg: "row", sm: "row", xs: "column" },
              }}
            >
              <Box sx={{ width: { lg: "40%", sm: "40%", xs: "100%" } }}>
                <PagingCarousel product={product} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: {
                    lg: "flex-start",
                    sm: "flex-start",
                    xs: "center",
                  },
                  alignItems: {
                    lg: "flex-start",
                    sm: "flex-start",
                    xs: "center",
                  },
                  width: { lg: "50%", sm: "60%" },
                  marginLeft: { lg: "0", sm: "1rem", xs: "0rem" },
                  marginTop: { lg: "0", sm: "0rem", xs: "2rem" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    marginBottom: "1rem",
                    width: { lg: "100%", sm: "100%", xs: "80%" },
                    fontSize: { lg: "1.5rem", sm: "1.2rem", xs: "1rem" },
                  }}
                >
                  {product.pname}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    padding: "0.6rem 0",
                    alignItems: "center",
                    width: "80%",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.ratings}
                    precision={0.5}
                    readOnly
                  />

                  <Typography variant="span" sx={{ fontSize: "1rem" }}>
                    ({product.numberOfReviews} reviews)
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: { lg: "1rem 0", sm: "1rem 0", xs: "0.6rem 0" },
                    width: "80%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "green",
                      fontSize: { lg: "1.2rem", sm: "1.1rem" },
                      fontWeight: "bold",
                    }}
                  >
                    <FormatPrice price={product.price} />
                  </Typography>

                  {product.stock >= 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "2rem 0",
                        width: "100%",
                      }}
                    >
                      <FormSelect
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={product?.stock}
                      />

                      <LoadingButton
                        className="btn addCartbtn"
                        sx={{
                          fontWeight: { lg: "bold", sm: "800", xs: "700" },
                          marginLeft: "2rem",
                          letterSpacing: "1px",
                          fontSize: { lg: "12px", sm: "10px", xs: "10px" },
                          width: "fit-content",
                          height: "2rem",
                          backgroundColor: !isAuthenticated
                            ? "grey !important"
                            : null,
                          color: !isAuthenticated ? "#e8e6df !important" : null,
                        }}
                        disabled={!isAuthenticated}
                        onClick={addProductToCart}
                        loading={btnLoading}
                        loadingPosition="center"
                      >
                        Add to Cart
                      </LoadingButton>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    padding: "1rem 0",
                    width: "80%",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: { lg: "1rem", sm: "0.9rem" },
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    Status:&nbsp;&nbsp;
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: "bold",
                        color: product.stock >= 1 ? "green" : "red",
                      }}
                    >
                      {product.stock >= 1 ? "In-Stock" : "Out-of-Stock"}
                    </Typography>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    padding: "1rem 0",
                    width: { lg: "100%", sm: "100%", xs: "80%" },
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: { lg: "1.2rem", sm: "1.1rem" },
                      fontWeight: "bold",
                    }}
                  >
                    Description:
                    <br />
                    <br />
                    <Typography
                      variant="span"
                      sx={{
                        fontSize: { lg: "1rem", sm: "1rem" },
                        fontWeight: "500",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Typography>

                  <Button
                    className="btn review-btn"
                    sx={{
                      fontWeight: { lg: "700", sm: "800", xs: "700" },
                      marginTop: "1rem",
                      letterSpacing: "1px",
                      fontSize: { lg: "12px", sm: "10px", xs: "12px" },
                      width: {
                        lg: "fit-content",
                        sm: "fit-content",
                        xs: "100%",
                      },
                      padding: "0.5rem",
                      backgroundColor: !isAuthenticated
                        ? "grey !important"
                        : null,
                      color: !isAuthenticated ? "#e8e6df !important" : null,
                    }}
                    onClick={handleClickOpen}
                    disabled={!isAuthenticated}
                  >
                    Submit Review
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: { lg: "4rem 2rem", sm: "4rem 2rem", xs: "2rem" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}
              >
                Reviews
              </Typography>

              <ReviewModalComp
                open={open}
                review={review}
                rating={rating}
                setReview={setReview}
                setRating={setRating}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
              />

              {product.reviews && product.reviews[0] ? (
                product.reviews.length <= 3 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: {
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                      },
                    }}
                  >
                    {product.reviews.map((review) => (
                      <ReviewCard
                        key={String(review._id)}
                        review={review}
                        length={product.reviews.length}
                        sliceLength={sliceLength}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ width: "100%" }}>
                    <CenterModeCarousel
                      reviews={product.reviews}
                      slidesToShow={slidesToShow}
                      sliceLength={sliceLength}
                    />
                  </Box>
                )
              ) : (
                <Typography
                  sx={{
                    margin: { lg: "2rem", sm: "2rem", xs: "1rem 0" },
                    textTransform: "uppercase",
                    fontSize: { lg: "1rem", sm: "1.2rem", xs: "0.8rem" },
                    fontWeight: "700",
                    wordSpacing: "5px",
                    letterSpacing: "2px",
                    textAlign: "justify",
                    color: "grey",
                  }}
                >
                  No Reviews yet Be the first one to review !
                </Typography>
              )}
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default ProductDetails;
