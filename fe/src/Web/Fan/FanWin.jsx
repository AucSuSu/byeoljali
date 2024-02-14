import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWin } from '../Stores/fanApplyListReducer';
import { useNavigate } from 'react-router-dom';
import FanSignList from '../Fan/FanSignList';
import useAxios from '../axios';

function FanWin() {
  const [stars, setStars] = useState([]);

  const customAxios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.fanapply.data);
  console.log(data);
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
      }));

      setStars(newStars);
    };

    makeStars();

    loadWinData();
  }, []);

  const loadWinData = async () => {
    const data = await customAxios.get('applyPage/1').then((res) => {
      return res.data.object;
    });
    console.log('내가 당첨된 리스트 : ', data);
    dispatch(loadWin(data));
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="w-[80%] ml-[10%] ">
        <div className="flex items-center justify-between my-4">
          <div>
            <div className="font-jamsil text-25 mb-2 text-white">당첨 내역</div>
            <div className="font-jamsil text-18 text-dark-gray">
              {data.length} 개의 당첨 내역을 보유 하고 있습니다
            </div>
            <div className="font-jamsil text-18 pt-2 text-dark-gray">
              팬싸인회는 시작 30분 전부터 입장 가능합니다
            </div>
          </div>
        </div>
      </div>
      <div className="w-[86%] ml-[7%] mb-5">
        {data.length === 0 ? (
          <>
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
                    <div>
            {stars.map((star) => (
                <div
                  key={star.id}
                  className="star"
                  style={{
                    left: star.left,
                    top: star.top,
                  }}
                ></div>
              ))}
                    </div>
            <div className="flex flex-col justify-center items-center px-16 py-32 border-4 border-deep-dark rounded-lg text-white font-jamsil text-35">
              <div>당첨 내역이 없습니다</div>
              <div
                className="text-25 text-hot-pink cursor-pointer hover:scale-110 transition-transform ease-in-out duration-500"
                onClick={goToHome}
              >
                응모 하러 가기
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 border-4 border-deep-dark rounded-lg mb-8">
              {data.map((data, index) => (
                <FanSignList key={index} data={data} />
              ))}
            </div>
            <div className="h-8"></div>
          </>
        )}
      </div>
    </>
  );
}

export default FanWin;
