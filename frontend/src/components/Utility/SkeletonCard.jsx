import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Box } from "@mui/material";

const SkeletonCard = ({ horizontal, vertical }) => {
    if (vertical) {
      return (
        <SkeletonTheme baseColor="#acaeb0" highlightColor="#c8cacc">
          <Box sx={{ width: "80%", margin: "1rem 4rem" }}>
            <Skeleton height={200} width={"100%"} />
          </Box>
        </SkeletonTheme>
      );
    }
  
    if (horizontal) {
      return (
        <SkeletonTheme baseColor="#acaeb0" highlightColor="#c8cacc">
          <Box
            sx={{
              width: {lg: "15%", md: "15%", sm: "30%", xs: "100%"},
              margin: "1rem 2rem",
            }}
          >
            <Skeleton height={200} width={"100%"} />
          </Box>
        </SkeletonTheme>
      );
    }
  
    return null;
  };
  
  export default SkeletonCard;
