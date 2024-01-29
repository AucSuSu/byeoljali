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
    console.log('상태 : ', status);
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
    console.log('일시분초 계산 : ', days, hour, minutes, seconds);
    setCountdown({
      days: days,
      hours: hour,
      minutes: minutes,
      seconds: seconds,
    });
  }, [remainingTime]);

  const dispatch = useDispatch();
  const fansignInfo = useSelector((state) => state.modal.fansignInfo);

  const openModifyMember = () => {
    dispatch(handleFansignInfo(data.artistFansignId));
  };

  console.log('시간 : ', countdown);

  // 스타일 참고
  const overlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={data.posterImageUrl}
          alt={data.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={openModifyMember}
        />
        <div
          style={{
            ...overlayStyle,
            display: status === 'READY_APPLYING' ? 'block' : 'none',
          }}
        >
          D-{countdown.days === 0 ? 'DAY' : countdown.days}
        </div>
        <div
          style={{
            ...overlayStyle,
            display: status === 'READY_FANSIGN' ? 'block' : 'none',
          }}
        >
          D-{countdown.days === 0 ? 'DAY' : countdown.days}
        </div>
      </div>
      {/* <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={openModifyMember}
      /> */}
      <p>{data.title}</p>
      <p>{data.memberName}</p>
      <p>
        {timeMessage}
        {timeMessage !== '팬싸인회 중' && (
          <b>
            {countdown.days}일 {countdown.hours}시간 {countdown.minutes}분{' '}
            {countdown.seconds}초
          </b>
        )}
      </p>
      {fansignInfo.open && fansignInfo.key === data.artistFansignId && (
        <FansignModal />
      )}
    </div>
  );
}
