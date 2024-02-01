// import React, { useRef, useState } from 'react';
// import Slider from 'react-slick';
// import ReactPlayer from 'react-player/youtube';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Carousel = () => {
//   const sliderRef = useRef();
//   const playerRef = useRef([]); // 각 비디오 플레이어에 대한 참조를 저장
//   const [playingIndex, setPlayingIndex] = useState(0); // 현재 재생 중인 비디오의 인덱스를 추적
//   const videoUrls = [
//     'https://www.youtube.com/watch?v=JleoAppaxi0', // 영상 URL 1
//     'https://www.youtube.com/watch?v=pSUydWEqKwE', // 영상 URL 2
//     'https://www.youtube.com/watch?v=2OvyA2__Eas', // 영상 URL 3
//   ];

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//   };

//   const handleVideoEnd = (index) => {
//     const nextIndex = (index + 1) % videoUrls.length;
//     sliderRef.current.slickGoTo(nextIndex);
//     setPlayingIndex(nextIndex); // 다음 비디오의 인덱스로 상태 업데이트
//   };

//   return (
//     <Slider ref={sliderRef} {...settings}>
//       {videoUrls.map((url, index) => (
//         <div
//           key={index}
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '700px',
//           }}
//         >
//           <ReactPlayer
//             ref={(player) => (playerRef.current[index] = player)}
//             url={url}
//             playing={index === playingIndex}
//             muted={true}
//             controls={true}
//             onEnded={() => handleVideoEnd(index)}
//             width="80%"
//             height="500px"
//             style={{ margin: 'auto' }} // ReactPlayer에 직접 스타일을 적용
//           />
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default Carousel;
