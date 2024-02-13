import React, { useState } from 'react';
import Slider from 'react-slick';

export default function CustomSlider({ datas }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '0px',
    centerMode: true, // 중앙에 슬라이드를 위치시키는 설정
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getSlideStyle = (index) => {
    if (index === currentSlide) {
      return 'w-[500px] h-[500px] object-cover scale-110 rounded-xl z-10';
    } else {
      return 'w-[400px] h-[400px] object-cover rounded-xl mt-10 opacity-40';
    }
  };

  return (
    <div className="mt-10">
      <Slider {...settings}>
        {datas.map((data, index) => (
          <div key={index} className="px-5 py-2">
            <img
              src={data.posterImageUrl}
              alt={`image ${index}`}
              className={getSlideStyle(index)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
