import React, { useEffect, useRef, useState } from 'react';
import ApplyFormModal from '../HomeApplyFormModal';

export default function Carousel({ datas }) {
  const newDatas = [...datas, ...datas, ...datas];
  const [imageWidth, setImageWidth] = useState(380);
  const [datasLength, setDatasLength] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideLeft, setSlideLeft] = useState(0);
  const [slideCount, setSliceCount] = useState(0);
  const [isStartTimer, setIsStartTimer] = useState(true);
  const [selectedData, setSelectedData] = useState(null); // 모달에 전달할 선택된 데이터를 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSliceCount((prev) => prev - 1);
    setSlideIndex((prev) => prev - 1);
    moveSlide(slideIndex - 1, slideCount - 1);
  };

  const onClickRight = () => {
    setSliceCount((prev) => prev + 1);
    setSlideIndex((prev) => prev + 1);
    moveSlide(slideIndex + 1, slideCount + 1);
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

  // 모달 열기 함수
  const openModal = (data) => {
    setSelectedData(data); // 선택된 데이터를 상태에 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    dispatch(clearData()); // data를 빈 배열로 초기화하는 액션을 디스패치
    setIsModalOpen(false);
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
        onClick={() => openModal(data)} // 이미지 클릭 시 openModal 호출, 선택된 데이터 전달
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
        {newDatas.map((data, index) => (
          styledImage(data, index)

        ))}
        
      </div>
      {isModalOpen && (
        <ApplyFormModal
          fansignId={selectedData.artistfansignId}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          propData={selectedData} // 모달에 선택된 데이터 전달
        />
      )}
      
    </div>
  );
}
