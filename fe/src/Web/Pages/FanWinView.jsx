import React from 'react';
import NavBar from '../Utils/NavBar';
import FanWin from '../Fan/FanWin';
// import './FanWinView.css';

function FanWinView() {
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <>
      <div className="min-h-screen bg-black overflow-hidden relative z-[11]">
        <NavBar />
        <div className="night z-10 absolute top-0 left-0 right-0 bottom-0 ;">
          {/* {[...Array(20)].map((_, index) => (
            <div
              className="shooting_star"
              key={index}
              style={{
                top: `${getRandomNumber(0, 100)}%`,
                left: `${getRandomNumber(0, 100)}%`,
                animationDelay: `-${getRandomNumber(0, 3000)}ms`,
              }}
            ></div>
          ))} */}
        </div>
        <div className="h-[100%]">
          <FanWin />
        </div>
      </div>
    </>
  );
}

export default FanWinView;
