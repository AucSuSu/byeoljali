import React , { useEffect, useState  } from 'react';
import NavBar from '../Utils/NavBar';
import FanWin from '../Fan/FanWin';
// import './FanWinView.css';

function FanWinView() {
  const [stars, setStars] = useState([]);

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    const makeStars = () => {
      const numStars = 50; // 원하는 별의 개수

      const newStars = Array.from({ length: numStars }, (_, index) => ({
        id: index,
        left: Math.random() * 100 + 'vw', // 랜덤한 가로 위치
        top: Math.random() * 100 + 'vh', // 랜덤한 세로 위치
        animationDuration: Math.random() * 1 + 0.5 + 's', // 랜덤한 애니메이션 속도
      }));

      setStars(newStars);
    };

    makeStars();

    // 일정 시간마다 별의 위치를 재설정
    const intervalId = setInterval(() => {
      makeStars();
    }, 5000);

  }, []);

  return (
    <>
      <div className="min-h-screen bg-black overflow-hidden relative z-[11]">
        <NavBar />
        
        <div className="night z-10 absolute top-0 left-0 right-0 bottom-0 ;">
          {[...Array(5)].map((_, index) => (
            <div
              className="shooting_star"
              key={index}
              style={{
                top: `${getRandomNumber(0, 100)}%`,
                left: `${getRandomNumber(0, 100)}%`,
                animationDelay: `-${getRandomNumber(0, 100)}ms`,
              }}
            ></div>
          ))}
        </div>
        {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                animationDuration: star.animationDuration,
              }}
            ></div>
          ))}
        <div className="h-[100%]">
          <FanWin />
        </div>
      </div>
    </>
  );
}

export default FanWinView;
