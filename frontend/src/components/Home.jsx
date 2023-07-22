import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MetaData from "./Utility/MetaData";
import { Carousel } from "./Carousels/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "./Utility/Notify";
import {
  clearProductErrors,
  getProducts,
} from "../redux/actions/productsAction";
import ProductCard from "./Product/ProductCard";
import { Link } from "react-router-dom";
import SkeletonCard from "./Utility/SkeletonCard";

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products } = useSelector((state) => state.products);

  // const loading = true;

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = `/`;
      dispatch(clearProductErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="ShopEasy - Home" />
      <Box className="slide-in-blurred-left" sx={{ margin: { lg: "2rem 4rem", sm: "2rem", xs: "0rem" } }}>
        <Carousel />
      </Box>

      <Box
      className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: { lg: "1rem 0", sm: "1rem 0", xs: "2rem 0rem" },
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: { xs: "80%", sm: "80%", md: "90%", lg: "95%", xl: "90%" },
          }}
        >
          <Typography
            sx={{
              borderBottom: "2px solid grey",
              borderBottomStyle: "dashed",
              fontSize: { lg: "16px", sm: "16px", xs: "10px" },
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Featured Products
          </Typography>

          <Link to="/products" className="link">
            <Typography
              sx={{
                borderBottom: "2px solid grey",
                borderBottomStyle: "dashed",
                fontSize: { lg: "16px", sm: "16px", xs: "10px" },
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              View more ->
            </Typography>
          </Link>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              margin: "1rem",
            }}
          >
            {[...Array(4)].map((i, index) => (
              <SkeletonCard key={index} horizontal />
            ))}
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
              gap: { xs: "2rem", sm: "2.5rem", md: "1rem", lg: "2rem" },
              padding: { xs: "1rem", sm: "1rem", lg: "1rem 0" },
              width: "100% !important",
              margin: "0 !important",
            }}
          >
            {products && products
              .sort((a, b) => b.ratings - a.ratings)
              .slice(0, 4)
              .map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={String(product._id)}
                  className="link"
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <ProductCard
                      pname={product.pname}
                      price={product.price}
                      image={product.images[0].url}
                      ratings={product.ratings}
                      numberOfReviews={product.numberOfReviews}
                    />
                  </Grid>
                </Link>
              ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
