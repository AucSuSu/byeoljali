import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FansignModal from '../Modal/FansignModal.jsx';
import { handleFansignInfo } from '../../Stores/modalReducer.js';

export default function MemberList({ data, status }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timeMessage, setTimeMessage] = useState('팬싸인회 중');

  const calculateRemainingTime = (targetTime) => {
    const currentTime = new Date();
    const standardTime = new Date(targetTime);
    return standardTime - currentTime;
  };

  useEffect(() => {
    let time = false;
    if (status === 'READY_APPLYING') {
      time = data.startApplyTime;
      setTimeMessage('응모 시작까지 : ');
    }
    if (status === 'APPLYING') {
      time = data.endApplyTime;
      setTimeMessage('응모 종료까지');
    }
    if (status === 'READY_FANSIGN') {
      time = data.startFansignTime;
      setTimeMessage('팬싸인회 시작까지');
    }

    if (time) {
      setRemainingTime(calculateRemainingTime(time));

      const startInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);

      return () => clearInterval(startInterval);
    }
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

  const dispatch = useDispatch();
  const fansignInfo = useSelector((state) => state.modal.fansignInfo);

  const openDetail = () => {
    dispatch(handleFansignInfo(data.memberFansignId));
  };

  // 이미지 위에 놓일 컨텐츠 스타일
  const overlayContentStyle =
    'absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4';

  return (
    <div className="text-white bg-blue-gray rounded-md relative hover:scale-105 transition-transform ease-in-out duration-500 font-jamsil">
      <div className="w-[80%] ml-[10%] relative ">
        <img
          src={data.posterImageUrl}
          alt={data.title}
          className="w-full h-auto aspect-square  cursor-pointer  mt-8 mb-2"
        />
        {/* 오버레이될 콘텐츠, 이미지 위에 꽉 채우도록 설정 */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 
          flex items-center justify-center text-white p-4
          hover:bg-hot-pink hover:bg-opacity-50
          "
          onClick={openDetail}
        >
          <p className="text-12">
            {timeMessage}
            <br />
            {timeMessage !== '팬싸인회 중' && (
              <b className="text-15">
                {countdown.days}일 {countdown.hours}시간 {countdown.minutes}분{' '}
                {countdown.seconds}초
              </b>
            )}
          </p>
        </div>
      </div>
      <div className="w-[80%] ml-[10%]">
        <p className="text-18 mt-3">[ {data.title} ]</p>
        <p className="text-15 mt-3 mb-3">{data.memberName}</p>
      </div>
      {fansignInfo === data.memberFansignId && (
        <FansignModal memberFansignId={data.memberFansignId} />
      )}
    </div>
  );
}
