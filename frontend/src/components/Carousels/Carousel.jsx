import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideImg1 from "../../images/slide-1.png";
import SlideImg2 from "../../images/slide-2.png";
import SlideImg3 from "../../images/slide-3.png";
import PrevArrow from "../../images/arrowPrev.png";
import NextArrow from "../../images/arrowNext.png";
import { ArrowButton } from "../Utility/ArrowButton";

const items = [
  {
    id: "1",
    src: SlideImg1,
    title: "Exclusive Deals on SmartPhones",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
  },
  {
    id: "2",
    src: SlideImg2,
    title: "50% Off on Casual Wears",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
  },
  {
    id: "3",
    src: SlideImg3,
    title: "Explore New Launches of Smart Watches",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
  },
];

export const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: (
      <ArrowButton
        imgSrc={PrevArrow}
        imgAlt="prev-button"
        slickArrowClass="slick-prev"
      />
    ),
    nextArrow: (
      <ArrowButton
        imgSrc={NextArrow}
        imgAlt="next-button"
        slickArrowClass="slick-next"
      />
    ),
  };

  return (
    <>
      <Slider {...settings} className="slick-slider slider">
        {items.map((value) => {
          return (
            <Box
              key={value.id}
              className="slick-carousel"
              sx={{ padding: { lg: " 0 6rem", sm: "0 2rem" } }}
            >
              <Box className="slick-carousel-data">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                    letterSpacing: "2px",
                    textAlign: { lg: "left", sm: "left", xs: "center" },
                    fontSize: { lg: "1.5rem", sm: "1.5rem", xs: "1rem" },
                  }}
                >
                  {value.title}
                </Typography>

                <Typography
                  sx={{
                    display: { lg: "block", sm: "block", xs: "none" },
                    width: { lg: "60%", sm: "100%" },
                    fontSize: { lg: "1rem", sm: "1rem" },
                    marginTop: "1.5rem",
                    textAlign: "justify",
                    wordBreak: "break-all",
                    letterSpacing: "2px",
                  }}
                >
                  {value.desc}
                </Typography>

                <Button
                  sx={{
                    padding: "10px",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    margin: {
                      lg: "3rem 0 0 0",
                      sm: "3rem 0 0 0",
                      xs: "1rem 5rem",
                    },
                  }}
                  className="btn carousel-button"
                >
                  {" "}
                  Visit Collections{" "}
                </Button>
              </Box>

              <Box sx={{ marginRight: { lg: "1rem", sm: "1rem" } }}>
                <img
                  src={value.src}
                  alt={value.id}
                  className={`slick-image-${value.id}`}
                />
              </Box>
            </Box>
          );
        })}
      </Slider>
    </>
  );
};
