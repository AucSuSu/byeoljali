import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import useAxios from '../../axios.js';

export default function Applying({ handleAddFansign }) {
  const fansignList = useSelector((state) => state.artistFansign.data);
  const [stars, setStars] = useState([]);

  const customAxios = useAxios();
  const getFansign = async () => {
    const response = await customAxios
      .get(`artists/apply?status=${status}`)
      .then((res) => {
        return res.data;
      });
    dispatch(getFansignInfo(response));
  };

  const dispatch = useDispatch();
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const status = 'APPLYING';

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

    getFansign();
  }, []);

  return (
    <>
      <div>
        {fansignList.object.length === 0 ? (
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
              <div>팬싸 내역이 없습니다</div>
              <div
                className="text-25 text-hot-pink cursor-pointer hover:scale-110 transition-transform ease-in-out duration-500"
                onClick={handleAddFansign}
              >
                팬사인회 개설하기
              </div>
            </div>
          </>
        ) : (
          <div className="w-[86%] ml-[7%] ">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 border-4 border-deep-dark rounded-lg z-10 mb-8">
              {fansignList.object.map((data, index) => (
                <FansignList key={index} data={data} status={data.status} />
              ))}
            </div>
            <div className="h-8"></div>
          </div>
        )}
      </div>
    </>
  );
}
