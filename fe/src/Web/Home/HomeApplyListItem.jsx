import React, { useEffect, useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';

// Reducer 추가
import { useDispatch } from 'react-redux';
import {
  detailList,
  clearData,
  setFansignId,
} from '../Stores/homeDetailListReducer';

const ListItem = ({ data, status }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const calculateRemainingTime = (targetTime) => {
    const currentTime = new Date();
    const standardTime = new Date(targetTime);
    return standardTime - currentTime;
  };

  useEffect(() => {
    let time = null;
    if (status === 'CurrentApply') {
      time = data.endApplyTime;
      setIsLive(true);
    } else {
      time = data.startApplyTime;
    }

    setRemainingTime(calculateRemainingTime(time));

    const startInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(startInterval);
  }, []);

  useEffect(() => {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hour = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setCountdown({
      days: days,
      hours: hour,
      minutes: minutes,
      seconds: seconds,
    });
  }, [remainingTime]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 모달 관리
  const openModal = () => {
    // dispatch를 사용하여 detailList 액션을 호출
    dispatch(setFansignId(data.artistfansignId));
    dispatch(detailList(data.artistfansignId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearData()); // data를 빈 배열로 초기화하는 액션을 디스패치
    setIsModalOpen(false);
  };

  return (
    <div
      id="card_container"
      className="bg-blue-gray text-white rounded-md m-1 font-sm transition-all h-[450px] font-big text-15 duration-500 hover:scale-105"
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        className={`mx-auto w-[85%] h-[60%] cursor-pointer rounded-md mt-4 mb-3 transition-all ${status === 'CommingSoon' ? 'opacity-80' : ''}`}
        onClick={() => openModal()}
      />
      <div className="flex text-12 ml-5 mb-3">
        <p
          className={`mr-2 border-2  ${isLive ? 'border-red text-red' : 'border-violet text-violet'} rounded-md px-3 p-1`}
        >
          {isLive ? 'LIVE' : 'READY'}
        </p>
        <p
          className={`mr-2 border-2  ${data?.mode ? 'border-sky-blue text-sky-blue' : 'border-neonGreen text-neonGreen'} px-3 rounded-md p-1`}
        >
          {data?.mode ? 'RANDOM' : 'LINE'}
        </p>
      </div>
      <div className=" ml-5 h-[65px] ">{data.title}</div>
      <div className=" mt-2 ml-5 text-hot-pink text-15">
        {status === 'CurrentApply' ? (
          <p>
            응모 마감까지 {countdown.days}일 {countdown.hours}시간{' '}
            {countdown.minutes}분 {countdown.seconds}초
          </p>
        ) : (
          <p>
            응모 시작까지 {countdown.days}일 {countdown.hours}시간{' '}
            {countdown.minutes}분 {countdown.seconds}초
          </p>
        )}
      </div>

      <ApplyFormModal
        fansignId={data.artistfansignId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        propData={data}
      />
    </div>
  );
};

export default ListItem;
