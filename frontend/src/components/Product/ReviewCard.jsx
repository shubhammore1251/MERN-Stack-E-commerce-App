import { Card, CardContent, Rating, Typography } from "@mui/material";
import React from "react";

const ReviewCard = ({ review, sliceLength, length }) => {
  return (
    <Card
      sx={{
        width: {
          xl: "25rem",
          lg: "20rem",
          md: "14rem",
          sm: length <= 3 ? "25rem" : "18rem",
          xs: length <= 3 ? "100%" : "58vw",
        },
        height: {
          xl: "18rem", 
          lg: "22rem", 
          md: "25rem", 
          sm: length <= 3 ? "18rem": "22rem", 
          xs: length <= 3 ? "18rem": "25rem"
        },
        margin: { lg: "2rem", sm: "2rem", xs: "1rem 0" },
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 86%, 75% 86%, 75% 100%, 50% 87%, 0 87%)",
        backgroundColor: "rgba(204, 202, 202, 0.255)",
        borderRadius: "8px",
        overflowY: "auto", 
      }}
    >
      <CardContent sx={{ margin: "1rem 0" }}>
        <Rating
          name="half-rating-read"
          defaultValue={review.rating}
          precision={0.5}
          readOnly
        />

        <Typography
          gutterBottom
          sx={{
            fontSize: { lg: "1.1rem", sm: "1rem", xs: "0.9rem" },
            fontWeight: "bold",
          }}
        >
          {review.name}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: { lg: "0.9rem", sm: "0.9rem", xs: "0.8rem" },
            color: "black",
            width: "100%",
            textOverflow: "ellipsis !important"
          }}
        >
          {review.comment.length > sliceLength
            ? `${review.comment.slice(0, sliceLength)}...`
            : review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
