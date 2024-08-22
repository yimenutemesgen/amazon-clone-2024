


import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { images} from './images/data'; 
import "./Carousel.css"

function CustomCarousel() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div key={index} className='hero__img'>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </ResponsiveCarousel>
      
    </div>
  );
}

export default CustomCarousel;





