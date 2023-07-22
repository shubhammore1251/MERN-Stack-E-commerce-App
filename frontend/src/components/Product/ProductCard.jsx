import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import { FormatPrice } from "../Utility/FormatPrice";

export default function ProductCard({
  pname,
  image,
  price,
  description,
  ratings,
  numberOfReviews,
  productComp,
  isSmallScreen
}) {

  return (
    <Card
      sx={{
        width: {
          lg: productComp ? "100%" : "16rem",
          xs: productComp ? "100%" : "20rem",
          sm: productComp ? "100%" : "16rem",
          md: productComp ? "100%" : "12rem",
        },
        height: {
          lg: productComp ? "16rem" : "20rem",
          sm: productComp ? "16rem" : "20rem",
          xs: "15rem",
          md: productComp ? "16rem" : "20rem",
        },
        border: "1.5px solid black",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: {
            lg: productComp ? "row" : "column",
            sm: productComp ? "row" : "column",
            xs: "row",
          },
          width: "100%",
          height: "100%",
        }}
      >
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={pname}
            sx={{
              width: {
                lg: productComp ? "60%" : "40%",
                sm: "35%",
                xs: "40%",
                md: productComp ? "50%" : "40%",
              },
              height: {
                lg: productComp ? "60%" : "40%",
                sm: "35%",
                xs: "40%",
                md: productComp ? "50%" : "40%",
              },
              marginLeft: { lg: "0", sm: "0", xs: 1 },
              objectFit: "contain",
            }}
          />
        )}

        <CardContent sx={{ width: "100%", padding: { lg: 2, sm: 2, md: 1, xs: 2 } }}>
          <Typography
            gutterBottom
            sx={{
              fontSize: {
                lg: productComp ? "1.2rem" : "0.8rem",
                sm: productComp ? "1rem" : "0.9rem",
                xs: productComp ? "0.8rem" : "0.7rem",
                md: productComp ? "1rem" : "0.9rem",
              },
              fontWeight: "bold",
            }}
          >
            {pname.length > (isSmallScreen? 40 : 100) ? `${pname.slice(0, isSmallScreen? 40: 100)}...` : pname}
          </Typography>

          <Typography
            variant="p"
            sx={{
              fontSize: {
                lg: productComp ? "1.1rem" : "0.8rem",
                sm: productComp ? "1rem" : "0.9rem",
                xs: productComp ? "0.8rem" : "0.7rem",
                md: productComp ? "1rem" : "0.9rem",
              },
              color: "green",
              fontWeight: "bold",
            }}
          >
            <FormatPrice price={price} />
          </Typography>

          <Typography
            variant="p"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: { lg: "row", sm: "row", xs: "column" },
              alignItems: { lg: "center", sm: "center", xs: "flex-start" },
              margin: "1rem 0",
            }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={ratings}
              precision={0.5}
              sx={{ fontSize: {lg: "1.1rem", md: "1.1rem", sm: "1rem", xs: "0.8rem"} }}
              readOnly
            />

            <Typography variant="span" sx={{ fontSize: {lg: "0.8rem", md: "0.8rem", sm: "0.7rem", xs: "0.6rem"} }}>
              ({numberOfReviews} reviews)
            </Typography>
          </Typography>

          {productComp && (
            <Typography
              variant="p"
              sx={{
                fontSize: { lg: "0.9rem", sm: "0.9rem", xs: "0.7rem" },
                color: "grey",
                fontWeight: "bold",
              }}
            >
              {description.slice(0, isSmallScreen? 50 : 80)}...
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
