import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Rating,
  Slider,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import MetaData from "../Utility/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductErrors,
  getProducts,
} from "../../redux/actions/productsAction";
import { Notify } from "../Utility/Notify";
import queryString from "query-string";
import Pagination from "@mui/material/Pagination";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import SkeletonCard from "../Utility/SkeletonCard";

const FilterListItems = [
  {
    name: "Electronics",
  },
  {
    name: "Footwear",
  },
  {
    name: "Accessories",
  },
  {
    name: "Fitness",
  },
  {
    name: "Food",
  },
  {
    name: "Health",
  },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 80000]);

  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0);

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const dispatch = useDispatch();

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let location = useLocation();

  const { query } = queryString.parse(location.search);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = `/`;
      dispatch(clearProductErrors());
    }
    dispatch(getProducts(query, currentPage));
  }, [dispatch, error, query, currentPage]);

  const applyFilters = () => {
    if (error) {
      Notify("error", error);
      window.location.href = `/products`;
      dispatch(clearProductErrors());
    }
    dispatch(getProducts(query, currentPage, price, category, rating));
    setIsFilterApplied(true);
  };

  const resetFilters = () => {
    setPrice([0, 80000]);
    setCategory("");
    setRating(0);
    if (error) {
      Notify("error", error);
      dispatch(clearProductErrors());
    }
    dispatch(getProducts(query, currentPage));
    setIsFilterApplied(false);
  };

  return (
    <>
      {query ? (
        <MetaData title={`Results - ${query}`} />
      ) : (
        <MetaData title="Products" />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: { lg: "1rem 2rem", sm: "1rem", xs: "2rem 0" },
          flexDirection: "column",
        }}
      >
        {/* <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: "3px",
            textAlign: "center",
            borderBottom: "2px solid black",
            borderBottomStyle: "dashed",
          }}
        >
          Products
        </Typography> */}

        {query || isFilterApplied ? (
          <Typography
            sx={{
              fontWeight: "500",
              letterSpacing: "2px",
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: "1rem",
              color: "#82807f",
            }}
          >
            Total Search Results - {filteredProductsCount}
          </Typography>
        ) : null}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isSmallScreen
              ? "center"
              : { lg: "flex-start", sm: "flex-start" },
            flexDirection: isSmallScreen
              ? "column-reverse"
              : { lg: "row", sm: "row" },
            width: "100%",
          }}
        >
          {/*Main Box Containing Products and Filter Options*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Price
            </Typography>

            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={80000}
              disableSwap={true}
              sx={{ width: 180, ml: 1 }}
            />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Categories
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
              }}
            >
              <nav aria-label="secondary mailbox folders">
                <List>
                  {FilterListItems.map((list, i) => (
                    <ListItem
                      disablePadding
                      key={i * 200}
                      sx={{ marginTop: "0.5rem", width: "70%" }}
                    >
                      <ListItemButton
                        disabled={category === list.name}
                        sx={{
                          border: "1px solid black",
                         
                        }}
                      >
                        <ListItemText
                          primaryTypographyProps={{ variant: "body1", style: { fontSize: "13px", fontWeight: "bold" } }}
                          primary={list.name}
                          onClick={() => setCategory(list.name)}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Rating
            </Typography>

            <Rating
              name="simple-controlled"
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Tooltip title="Apply Filters" sx={{ fontSize: "2rem" }}>
                <IconButton onClick={applyFilters}>
                  <FilterAltIcon fontSize="large" color="success" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Clear Filters">
                <span>
                  <IconButton
                    onClick={resetFilters}
                    disabled={!isFilterApplied}
                  >
                    <ClearIcon
                      fontSize="large"
                      color={!isFilterApplied ? "disabled" : "error"}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>

          {/* Product Cards */}
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
              {[...Array(3)].map((i, index) => (
                <SkeletonCard key={index} vertical/>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                margin: { lg: "1rem 2rem", sm: "1rem 2rem", xs: "1rem 0" },
                width: "100%",
              }}
            >
              {products && products?.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={String(product._id)}
                  className="card-link"
                >
                  <ProductCard
                    pname={product?.pname}
                    price={product?.price}
                    image={product?.images[0].url}
                    ratings={product?.ratings}
                    description={product?.description}
                    numberOfReviews={product?.numberOfReviews}
                    productComp
                    isSmallScreen={isSmallScreen}
                  />
                </Link>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          {/* Pagination */}
          {resultPerPage < filteredProductsCount && (
            <Box sx={{ marginTop: "2rem" }}>
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                page={currentPage}
                onChange={handleCurrentPage}
                size="maedium"
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Products;
