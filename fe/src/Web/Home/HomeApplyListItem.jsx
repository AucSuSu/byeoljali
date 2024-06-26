import React, { useEffect, useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';
import { setAlbumNum, setMemberId } from '../Stores/homeDetailListReducer';
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
      const endApplyDate = new Date(data.endApplyTime);
      endApplyDate.setHours(23, 59, 59);
      time = endApplyDate;
      setIsLive(true);
    } else {
      const startApplyDate = new Date(data.startApplyTime);
      startApplyDate.setHours(0, 0, 1);
      time = startApplyDate;
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
    dispatch(setMemberId(null));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearData()); // data를 빈 배열로 초기화하는 액션을 디스패치
    dispatch(setMemberId(null));
    dispatch(setAlbumNum(0));
    setIsModalOpen(false);
  };

  return (
    <div
      id="card_container"
      className="bg-blue-gray text-white rounded-md  font-sm transition-all h-[450px] font-jamsil text-15 duration-500 mb-6 mx-2 hover:scale-105"
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
          {isLive ? 'APPLYING' : 'READY'}
        </p>
        <p
          className={`mr-2 border-2  ${data?.mode === 'RANDOM' ? 'border-sky-blue text-sky-blue' : 'border-neonGreen text-neonGreen'} px-3 rounded-md p-1`}
        >
          {data?.mode === 'RANDOM' ? 'RANDOM' : 'LINE'}
        </p>
      </div>
      <div className=" ml-5 h-[65px] mx-2">{data.title}</div>
      <div className=" mt-2 ml-5 text-hot-pink text-15">
        {status === 'CurrentApply' ? (
          <p>
            마감까지 {countdown.days}일 {countdown.hours}시간{' '}
            {countdown.minutes}분 {countdown.seconds}초
          </p>
        ) : (
          <p>
            시작까지 {countdown.days}일 {countdown.hours}시간{' '}
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
