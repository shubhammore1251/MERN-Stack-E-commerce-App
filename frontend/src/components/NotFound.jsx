import { Box, Button } from "@mui/material";
import React from "react";
import NotFoundImg from "../images/404.gif"

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "centen",
        alignItems: "center",
        flexDirection: "column",
        margin: "4rem 0",
      }}
    >
      <Box component="img" src={NotFoundImg} alt="404 Error" sx={{ height: 400,
          width: 400,}}/>

      {/* <img src={NotFoundImg} alt="" /> */}

      <Button component="a" href="/" className="btn" sx={{mt: 3}}>
        Go Back To ShopEasy
      </Button>
    </Box>
  );
};

export default NotFound;
