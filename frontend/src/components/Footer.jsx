import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import GoogleStore from "../images/gstore.png";
import AppStore from "../images/appstore.png";

const Footer = () => {
  return (
    <>
      <Container
        maxWidth="false"
        className="footer-color"
        sx={{
          display: "flex !important",
          justifyContent: {
            lg: "space-between",
            sm: "space-between",
            xs: "center",
          },
          alignItems: "center",
          width: "100%",
          flexDirection: { lg: "row", sm: "row", xs: "column" },
          color: "#fff",
          gap: { lg: "2rem", xs: "1rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: { lg: "2rem 0", xs: "1rem 0" },
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              width: "55%",
              textAlign: "justify",
              marginBottom: "2rem",
              fontSize: { lg: "18px", sm: "16px", xs: "14px" },
              color: "black",
            }}
          >
            Download Our App from Playstore and App Store
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { lg: "row", sm: "row", xs: "column" },
            }}
          >
            <Avatar
              src={GoogleStore}
              alt="logo"
              sx={{ borderRadius: "0", width: "6rem", height: "fit-content" }}
            />
            <Avatar
              src={AppStore}
              alt="logo"
              sx={{
                borderRadius: "0",
                width: "6rem",
                height: "fit-content",
                marginTop: { lg: 0, sm: 0, xs: 2 },
                marginLeft: { lg: 2, sm: 2, xs: 0 },
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            fontSize: { lg: "1rem", sm: "1rem", xs: "0.8rem" },
            textAlign: "center",
            margin: { lg: "2rem 2rem", xs: "1rem 1rem " },
            color: "black",
          }}
        >
          Made with ❤️ by{" "}
          <a
            href="https://github.com/shubhammore1251"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            <span
              style={{
                color: "rgb(7,133,121)",
                margin: "0 0.5rem",
                fontWeight: "bold",
              }}
            >
              Shubham More
            </span>
          </a>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            fontSize: { lg: "1rem", sm: "1rem", xs: "0.8rem" },
            textAlign: "center",
            margin: { lg: "2rem 2rem", xs: "1rem 1rem " },
            color: "black",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <a href="/" className="link">
            <span
              style={{
                color: "rgb(7,133,121)",
                margin: "0 0.5rem",
                fontWeight: "bold",
              }}
            >
              ShopEasy
            </span>
          </a>
          All rights reserved.
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
