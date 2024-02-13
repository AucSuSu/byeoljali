import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FanSignModal from './FanSignModal';
import useAxios from '../axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

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

  // 대기방 참가 로직
  const participate = async () => {
    const openviduData = await joinFansign();
    navigate('/fan-fansign', {
      state: {
        propsData: {
          fanId: fanInfo.fanId,
          profileImage: fanInfo.profileImageUrl,
          orders: data.orders,
          nickname: fanInfo.nickname,
          birthday: fanInfo.birth,
          sessionId: openviduData.object.sessionId,
          tokenId: openviduData.object.tokenId,
          memberFansignId: data.memberfansignId,
          title: data.artistFansignTitle,
          member: data.memberName,
          artistFansignId: data.artistFansignId,
        },
      },
    });
  };

  const fanSignId = data.memberfansignId;
  const fanInfo = useSelector((state) => state.faninfo.data);
  const customAxios = useAxios();
  const navigate = useNavigate();

  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterwaiting/${fanSignId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  };

  return (
    <>
      {data.fansignStatus === 'APPLYING' ? (
        // 응모내역
        <>
          <div className="text-white bg-blue-gray rounded-md relative hover:scale-105 transition-transform ease-in-out duration-500 font-jamsil">
            <div className="w-[80%] ml-[10%]">
              <img
                onClick={toggleModal}
                src={data.posterImageUrl}
                alt="Poster Image"
                className="w-full h-auto aspect-square  cursor-pointer  mt-8 mb-2"
              />
              <div className="flex flex-col justify-between mb-20">
                <div className="flex gap-3 mt-3 text-15">
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
                <div className="mt-3 text-15">{data.artistFansignTitle}</div>
              </div>
              <div className="absolute bottom-0 mt-10 mb-6 text-15 text-hot-pink">
                마감까지 {timeLeft}
              </div>
            </div>
          </div>
          {isModalVisible && (
            <>
              <FanSignModal
                data={data}
                onClose={() => setModalVisible(false)}
              />
            </>
          )}
        </>
      ) : (
        // 당첨내역
        <>
          <div className="text-white bg-blue-gray rounded-md relative hover:scale-105 transition-transform ease-in-out duration-500 font-jamsil">
            <div className="w-[80%] ml-[10%]">
              <img
                onClick={toggleModal}
                src={data.posterImageUrl}
                alt="Poster Image"
                className="w-full h-auto aspect-square  cursor-pointer  mt-8 mb-2"
              />
              <div className="flex flex-col justify-between mb-10">
                <div className="flex gap-3 mt-3 text-15">
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
                <div className="mt-3 text-15">{data.artistFansignTitle}</div>
              </div>
              {data.fansignStatus === 'SESSION_CONNECTED' ? (
                <div className="flex flex-row justify-center mt-3 mb-6 text-15">
                  <button
                    className=" px-1 py-1 rounded-md bg-hot-pink text-white"
                    onClick={participate}
                  >
                    입장하기
                  </button>
                </div>
              ) : (
                <div className="flex flex-row justify-center mt-3 mb-6 text-15">
                  <button className="  px-1 py-1 rounded-md bg-light-gray text-white cursor-not-allowed">
                    입장하기
                  </button>
                </div>
              )}
            </div>
          </div>
          {isModalVisible && (
            <>
              <FanSignModal
                data={data}
                onClose={() => setModalVisible(false)}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default FanSignList;
