import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useAxios from '../axios';
import { useNavigate } from 'react-router-dom';
import './FanSignModal.css';

function FanSignModal({ data, onClose }) {
  console.log(data);
  const [stars, setStars] = useState([]);
  const customAxios = useAxios();

  // 대기방 참가 로직
  // const fanInfo = useSelector((state) => state.faninfo.data);
  // const customAxios = useAxios();
  const navigate = useNavigate();

  // const joinFansign = async () => {
  //   const response = await customAxios
  //     .get(`fan/fansigns/enterwaiting/${fanSignId}`)
  //     .then((res) => {
  //       return res.data;
  //     });
  //   return response;
  // };

  // fanSign모달에서 artist 정보를 누르면 artistInfo 페이지로 이동합니다.
  const artistDetail = async () => {
    navigate('/artist-profile', {
      state: {
        propsData: {
          artistId: fanSignDetail.artistId,
        },
      },
    });
    onClose();
  };

  // const participate = async () => {
  //   const openviduData = await joinFansign();
  //   navigate('/fan-fansign', {
  //     state: {
  //       propsData: {
  //         fanId: fanInfo.fanId,
  //         profileImage: fanInfo.profileImageUrl,
  //         orders: fanSignDetail.orders,
  //         nickname: fanInfo.nickname,
  //         birthday: fanInfo.birth,
  //         sessionId: openviduData.object.sessionId,
  //         tokenId: openviduData.object.tokenId,
  //         memberFansignId: data.memberfansignId,
  //         title: data.artistFansignTitle,
  //         member: data.memberName,
  //         artistFansignId: fanSignDetail.artistfansignId,
  //       },
  //     },
  //   });
  //   onClose();
  // };
  // 대기방 참가 로직 끝

  // css 용 임시 주석

  const fanSignId = data.memberfansignId;

  const [fanSignDetail, setFanSignDetail] = useState('');
  console.log(fanSignDetail);

  useEffect(() => {
    const makeStars = () => {
      const numStars = 800; // 원하는 별의 개수

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

    // 컴포넌트가 언마운트되면 interval 제거
    fetchData(fanSignId);

    return () => clearInterval(intervalId);
  }, [fanSignId]);

  const fetchData = async (fanSignId) => {
    const result = await customAxios
      .get(`applyPage/detail/${fanSignId}`)
      .then((res) => {
        setFanSignDetail(res.data.object);
      });
  };

  // 모달 바깥 영역을 클릭하면 모달을 닫습니다.
  const handleCloseModal = (e) => {
    onClose();
  };

  // 모달 컨텐츠 영역의 이벤트가 바깥으로 전파되지 않도록 합니다.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // 날짜 계산용
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit' }; // 월과 일만 표시
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', options); // 'ko-KR' 로케일을 사용하여 날짜 형식을 조정
  };

  // 팬사인 계산용
  const formatFansignTime = (dateTimeString) => {
    const optionsDate = { month: '2-digit', day: '2-digit' }; // 월과 일만 표시
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false }; // 24시간제 시간과 분만 표시

    const date = new Date(dateTimeString);
    const datePart = date.toLocaleDateString('ko-KR', optionsDate); // 날짜 포맷팅 "MM/DD"
    const timePart = date.toLocaleTimeString('ko-KR', optionsTime).slice(0, 5); // 시간 포맷팅 "HH:MM", 초를 제거하기 위해 slice 사용

    return `${datePart} ${timePart}`; // "MM/DD HH:MM" 형식으로 결합
  };

  const startApplyDateFormatted = formatDate(fanSignDetail.startApplyTime); // "01/31"
  const endApplyDateFormatted = formatDate(fanSignDetail.endApplyTime); // "02/02"
  const startFansignDateFormatted = formatFansignTime(
    fanSignDetail.startFansignTime,
  );

  const applySchedule = `응모일정: ${startApplyDateFormatted}~${endApplyDateFormatted}`; // "응모일정: 01/31~02/02"
  const fanSignSchedule = `사인회일정: ${startFansignDateFormatted}`; // 사인회일정
  const memberSchedule = ` ${fanSignDetail.memberName}`; // 신청멤버
  const artistInfo = fanSignDetail.artistName; // 아티스트 이름

  return (
    <>
      {fanSignDetail ? (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 flex justify-center overflow-hidden items-center z-50 text-white"
          onClick={handleCloseModal}
        >
          <div
            className="bg-black w-[80%] h-[90vh] p-10 overflow-hidden rounded-md grid grid-cols-2"
            onClick={handleModalContentClick}
            style={{
              borderRadius: '20px',
            }}
          >
            <div
              className="p-3 justify-center items-align flex"
              style={{
                position: 'relative',
              }}
            >
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
              <div className=""
              style={{
                zIndex : '999'
              }}>
                <img
                  src={fanSignDetail.posterImageUrl}
                  alt=""
                  className="object-cover justify-center items-align flex w-[500px] h-[550px]"
                  style={{
                    boxShadow:
                      '0 0 10px white, 0 0 20px white, 0 0 30px white',
                  }}
                />
              </div>
            </div>

            <div className="p-3 overflow-y-auto custom-scrollbar">
              <div className="flex  flex-col">
                <div className="font-jamsil bolder text-40"
                style={{
                  textShadow:
                    '0 0 10px #FF2990, 0 0 20px #FF2990, 0 0 30px #FF2990',
                }}>
                  [ {fanSignDetail.artistFansignTitle} ]
                </div>

                <div className="font-jamsil pt-3">
                  <p className="text-18 mr-3">📌 공지</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fanSignDetail.information,
                    }}
                  />
                </div>
                <div className='flex pt-6'>

                <div className="font-jamsil">
                  <p className="bolder text-18 mr-3">🗓️ 응모 기간</p>
                  <div className="text-15">{applySchedule}</div>
                </div>
                <div className="font-jamsil ps-6">
                  <p className="bolder text-18 mr-3">🗓️ 사인회 일정</p>
                  <div className="text-15">{fanSignSchedule}</div>
                </div>
                </div>
                <div className="font-jamsil pt-6">
                  <p className="bolder text-18 ">👯 아티스트</p>
                    <p
                      className="mt-2 pl-2 pr-2 font-isa border-b border-white hover:cursor-pointer hover:text-hot-pink hover:border-hot-pink hover:scale-110 inline-block"
                      onClick={artistDetail}
                    >
                      {artistInfo} ▶︎
                    </p>
                  </div>
                </div>
                <div className="font-jamsil pt-6">
                  <p className="bolder text-18 mr-3">🧕 신청 멤버</p>
                  <div className="text-15">{memberSchedule}</div>
                </div>
                <div className="pt-3 font-jamsil flex justify-center">
                  <button
                    className="px-2 py-1 bg-light-gray rounded-md"
                    onClick={onClose}
                  >
                    <div className="text-black">닫기</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
      ) : null}
    </>
  );
}

export default FanSignModal;
