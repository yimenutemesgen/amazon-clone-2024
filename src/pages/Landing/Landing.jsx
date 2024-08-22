

import React from 'react'
import LayOut from '../../components/LayOut/LayOut';
import Category from '../../components/Category/Category';
import CustomCarousel from '../../components/Carousel/CustomCarousel';
import Product from '../../components/Products/Product';

function Landing() {
  return (
    <LayOut>
      <CustomCarousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing
