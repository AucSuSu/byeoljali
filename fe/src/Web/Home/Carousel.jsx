// Carousel.jsx
import React from 'react';
import Slider from 'react-slick';

import { useSelector } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const dataList = useSelector((state) => state.homerecent.data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동으로 슬라이드 전환 활성화
    autoplaySpeed: 2000, // 자동 전환 간격 (ms)
  };

  const carouselStyle = {
    width: '20%', // 원하는 너비 설정
    margin: '0 auto', // 중앙 정렬을 위한 margin 설정
  };

  return (
    <div style={carouselStyle}>
      <Slider {...settings}>
        <img
          src="https://pbs.twimg.com/media/FZuGhtZaMAEMLdh.jpg"
          alt="치이카와"
        />
        <img
          src="https://i1.sndcdn.com/artworks-HHzS3NMQpYq35RNY-io4p8w-t500x500.jpg"
          alt="하치와레"
        />
        <img
          src="https://i.namu.wiki/i/PvFwgusdC6VV7bVkH2cEk4z05lDzIeREeRX0OY9axRt3fPQXL7ydVzDAFe_9gZx6kOhmQW2jjqAaxBlQO2opQg.webp"
          alt="우사기"
        />
        {/* {dataList.map((item, index) => (
          <div key={index}>
            <img src={item.posterImageUrl} alt={`Carousel ${index + 1}`} />
          </div>
        ))} */}
      </Slider>
    </div>
  );
};

export default Carousel;
