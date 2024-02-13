import React, { useEffect, useRef, useState } from 'react';

export default function Carousel({ datas }) {
  const newDatas = [...datas, ...datas, ...datas];
  const [imageWidth, setImageWidth] = useState(380);
  const [datasLength, setDatasLength] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideLeft, setSlideLeft] = useState(0);
  const [slideCount, setSliceCount] = useState(0);
  const [isStartTimer, setIsStartTimer] = useState(true);

  const slideRef = useRef(null);

  useEffect(() => {
    // 너비 380 설정. 화면에 따라 값 변경해야 함.
    setImageWidth(380);
    console.log(datas.length);
    setDatasLength(datas.length);
    setSlideIndex(datas.length);
    setSlideLeft(datas.length * 380);
  }, []);

  const handleMouseLeave = () => {
    setIsStartTimer(true);
  };

  const handleMouseEnter = () => {
    setIsStartTimer(false);
  };

  const Arrow = ({ direct, onClick }) => (
    <div
      className={`absolute top-1/2 ${direct === 'left' ? 'left-[23%]' : 'right-[23%]'} translate-y-[-50%] z-20 text-white text-30 cursor-pointer hover:text-35 hover:text-hot-pink`}
      onClick={onClick}
    >
      {direct === 'left' ? '◀︎' : '▶︎'}
    </div>
  );

  const onClickLeft = () => {
    if (slideIndex === 0) {
      // 맨 앞에 도달했을 때, 맨 끝으로 점프
      setSlideIndex(newDatas.length - 1);
      setSlideLeft((newDatas.length - 1) * imageWidth);
    } else {
      setSlideIndex((prev) => prev - 1);
      setSlideLeft((prev) => prev - imageWidth);
    }
  };

  const onClickRight = () => {
    if (slideIndex === newDatas.length - 1) {
      // 맨 끝에 도달했을 때, 맨 앞으로 점프
      setSlideIndex(0);
      setSlideLeft(0);
    } else {
      setSlideIndex((prev) => prev + 1);
      setSlideLeft((prev) => prev + imageWidth);
    }
  };

  const moveSlide = (newSlideIndex, newSlideCount) => {
    setSlideLeft(newSlideIndex * imageWidth);
    if (datasLength === newSlideCount || datasLength === -newSlideCount) {
      setTimeout(() => {
        slideRef.current.style.transition = '';
        setSlideLeft(datasLength * imageWidth);
        setSlideIndex(datasLength);
        setSliceCount(0);
        setTimeout(() => {
          slideRef.current.style.transition = 'transform 500ms ease-out';
        }, 0);
      }, 500);
    }
  };

  const styledImage = (data, index) => {
    let style = `w-[380px] h-[450px] object-cover rounded-lg mt-10 opacity-40`;
    // let style = `w-[${imageWidth}px] h-[550px] object-cover rounded-lg mt-10 opacity-40`;
    if (index === slideIndex + 1) {
      style = `w-[420px] h-[450px] object-cover rounded-lg -mx-20 scale-110 mt-10 z-10`;
      // style = `w-[${imageWidth * 1.25}px] h-[550px] object-cover rounded-lg -mx-20 scale-110 mt-10 z-10`;
    }

    return (
      <img
        key={index}
        src={data.posterImageUrl}
        alt={`image ${index}`}
        className={style}
      />
    );
  };

  useEffect(() => {
    setImageWidth(380); // 화면에 따라 값 변경 가능
    // 자동 슬라이드 기능
    let timer;
    if (isStartTimer) {
      timer = setInterval(() => {
        onClickRight();
      }, 5000); // 5초마다 오른쪽으로 이동
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStartTimer, onClickRight]); // 의존성 배열에 onClickRight 추가

  return (
    <div
      className={`relative h-[550px] w-[1020px] m-auto overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Arrow direct="left" onClick={onClickLeft} />
      <Arrow direct="right" onClick={onClickRight} />
      <div
        ref={slideRef}
        className="absolute flex left-0 top-0"
        style={{
          transition: 'transform 500ms ease-out',
          transform: `translateX(${-slideLeft}px)`,
        }}
      >
        <div className="flex">
          {newDatas.map((data, index) => styledImage(data, index))}
        </div>
      </div>
    </div>
  );
}
