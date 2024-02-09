import React, { useState, useEffect } from 'react';

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(data.length);
  const [isHovered, setIsHovered] = useState(false);

  // 5초 마다 넘기기
  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        next();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //
  const next = () => {
    if (currentIndex < length - 3) {
      setCurrentIndex((prevState) => prevState + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    } else {
      setCurrentIndex(length - 3);
    }
  };

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-all ease-out duration-300"
        style={{
          transform: `translateX(-${currentIndex * 33.3 + 66.3}%)`, // 중앙 이미지와 겹치도록 수정
          marginLeft: '-33.3%', // 가장 좌측 이미지가 가운데 이미지와 겹치도록 수정
        }}
      >
        {data.map((Thumbnail, idx) => (
          <img
            key={idx}
            src={Thumbnail.url}
            alt=""
            className={`w-1/3 h-[400px] flex-shrink-0 flex-grow border-radius-5 ${
              idx === currentIndex + 1
                ? 'border-4 border-slate-700'
                : 'border border-slate-700'
            } ${
              idx === currentIndex + 1
                ? 'opacity-100'
                : 'opacity-50 hover:opacity-100'
            } ${
              idx === currentIndex + 1
                ? 'transform scale-105'
                : 'transform scale-100'
            }`}
            style={{
              marginRight: idx === data.length - 1 ? 0 : '2%',
            }}
          />
        ))}
      </div>
      <div className="flex items-center">
        (
        <button
          onClick={prev}
          className={`w-1/2 h-full border-radius-50 ${
            currentIndex <= 0 ? 'invisible' : ''
          } bg-yellow-500 border-2 border-black text-white`}
        >
          Left
        </button>
        ) (
        <button
          onClick={next}
          className={`w-1/2 h-full border-radius-50 ${
            currentIndex >= length - 3 ? 'invisible' : ''
          } bg-yellow-500 border-2 border-black text-white`}
        >
          Right
        </button>
        )
      </div>
    </div>
  );
};

export default Carousel;
