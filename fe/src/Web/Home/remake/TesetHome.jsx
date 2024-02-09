import React from 'react';
import NewCarousel from './NewCarousel';
import { carouselImage } from '../../data';
const HomePage = () => {
  return (
    <div className="w-[80%] ml-[10%]">
      <NewCarousel data={carouselImage}></NewCarousel>
    </div>
  );
};

export default HomePage;
