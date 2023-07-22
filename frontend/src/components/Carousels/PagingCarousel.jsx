import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material';

const PagingCarousel = ({product}) => {
    
    const settings = {
        customPaging: function (i) {
          const imageUrl = product.images[i].url;
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a>
              <img src={imageUrl} alt=''/>
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  return (
    <>
    <Slider {...settings} className='paging-slick-slider'>
    {product.images && product.images.map((image,i) => {
       return (
        <Box key={image.public_id}>
          <img className="paging-slick-image" src={image.url} alt={image.public_id}/>
        </Box>
       )
    })
     }
    </Slider>
    </>
  )
}

export default PagingCarousel