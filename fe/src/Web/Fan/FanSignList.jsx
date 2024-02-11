import React, { useState, useEffect } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList({ data }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(data.endApplyTime);
      const difference = endTime - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        // 타이머가 0에 도달했을 때의 기본 값을 설정합니다.
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    };

    const updateTimer = () => {
      const countdown = calculateTimeLeft();
      setTimeLeft(
        `${countdown.days}일 ${countdown.hours}시간 ${countdown.minutes}분 ${countdown.seconds}초`,
      );
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [data.endApplyTime]);

  return (
    <>
      {data.fansignStatus === 'APPLYING' ? (
        // 응모내역
        <div className="text-white bg-slate-900 rounded-md pb-8 relative">
          <div className="w-[80%] ml-[10%]">
            <img
              onClick={toggleModal}
              src={data.posterImageUrl}
              alt="Poster Image"
              className="w-full h-auto aspect-square  cursor-pointer hover:scale-105 transition-transform ease-in-out duration-500 mt-8 mb-2"
            />
            <div className="flex gap-3">
              <div className="border rounded-md border-kakao-yellow text-kakao-yellow px-1">
                APPLYING
              </div>
              {data.mode === 'RANDOM' ? (
                <div className="border rounded-md border-sky-blue text-sky-blue px-1">
                  RANDOM
                </div>
              ) : (
                <div className="border rounded-md border-neonGreen text-neonGreen px-1">
                  LINE
                </div>
              )}
            </div>
            <div>{data.artistFansignTitle}</div>
            <div className="absolute bottom-8 ">마감까지 {timeLeft}</div>
          </div>

          {isModalVisible && (
            <FanSignModal data={data} onClose={() => setModalVisible(false)} />
          )}
        </div>
      ) : (
        // 당첨내역
        <div className="text-white bg-slate-900 rounded-md pb-8 relative">
          <div className="w-[80%] ml-[10%]">
            <img
              onClick={toggleModal}
              src={data.posterImageUrl}
              alt="Poster Image"
              className="w-full h-auto aspect-square  cursor-pointer hover:scale-105 transition-transform ease-in-out duration-500 mt-8 mb-2"
            />
            <div className="flex gap-3">
              <div className="border rounded-md border-red text-red px-1">
                LIVE
              </div>
              {data.mode === 'RANDOM' ? (
                <div className="border rounded-md border-sky-blue text-sky-blue px-1">
                  RANDOM
                </div>
              ) : (
                <div className="border rounded-md border-neonGreen text-neonGreen px-1">
                  LINE
                </div>
              )}
            </div>
            <div>{data.artistFansignTitle}</div>
          </div>

          {isModalVisible && (
            <FanSignModal data={data} onClose={() => setModalVisible(false)} />
          )}
        </div>
      )}
    </>
  );
}

export default FanSignList;
