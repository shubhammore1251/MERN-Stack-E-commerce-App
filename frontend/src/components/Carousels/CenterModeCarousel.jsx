import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "../Product/ReviewCard"
import PrevArrow from "../../images/arrowPrev.png";
import NextArrow from "../../images/arrowNext.png";
import { ArrowButton } from "../Utility/ArrowButton";

const CenterModeCarousel = ({reviews,slidesToShow,sliceLength}) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: slidesToShow,
    speed: 2000,
    autoplay: true,
    prevArrow: <ArrowButton imgSrc={PrevArrow} imgAlt="prev-button" slickArrowClass="slick-prev" />,
    nextArrow: <ArrowButton imgSrc={NextArrow} imgAlt="next-button" slickArrowClass="slick-next" />,
  };

  return (
    <Slider {...settings} className="center-slick-slider">
      {reviews.map((review) => (
        <ReviewCard key={String(review._id)} review={review} sliceLength={sliceLength} length={reviews.length}/>
      ))}
    </Slider>
  );

};

export default CenterModeCarousel;
