import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useAxios from '../axios';
import { useNavigate } from 'react-router-dom';

function FanSignModal({ data, onClose }) {
  console.log(data);

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
    fetchData(fanSignId);
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
  const memberSchedule = `신청멤버: ${fanSignDetail.memberName}`; // 신청멤버
  const artistInfo = fanSignDetail.artistName; // 아티스트 이름

  return (
    <div>
      {fanSignDetail ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-black max-w-300 w-300 max-h-200 h-200 p-6 rounded-md grid grid-cols-2"
            onClick={handleModalContentClick}
          >
            <div className="p-3">
              <div className="font-big bolder text-40 mb-6">MY APPLY</div>
              <div className="w-[100%] h-[620px]">
                <img
                  src={fanSignDetail.posterImageUrl}
                  alt=""
                  className="w-full h-full object-fill"
                />
              </div>
            </div>
            <div className="p-3 pt-24 pb-9">
              <div className="flex  h-[100%] flex-col justify-between">
                <div className="font-big bolder text-40">
                  [ {fanSignDetail.artistFansignTitle} ]
                </div>
                <div className="pt-3 font-big">
                  <p className="bolder text-18 mr-3">📌 공지</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fanSignDetail.information,
                    }}
                  />
                </div>
                <div className="pt-3 font-big">
                  <p className="bolder text-18 mr-3">🗓️ 응모 기간</p>
                  <div>{applySchedule}</div>
                </div>
                <div className="pt-3 font-big">
                  <p className="bolder text-18 mr-3">🗓️ 사인회 일정</p>
                  <div>{fanSignSchedule}</div>
                </div>
                <div className="pt-3 font-big">
                  <p className="bolder text-18 mr-3">👯 아티스트</p>
                  <div>
                    {artistInfo}
                    {'  '}
                    <button
                      onClick={artistDetail}
                      className="text-white hover:text-pink-700"
                    >
                      ▶ 상세보기
                    </button>
                  </div>
                  {/* <button
                    onClick={artistDetail}
                    className="text-white hover:text-pink-700"
                  >
                    {artistInfo}
                  </button> */}
                </div>
                <div className="pt-3 font-big">
                  <p className="bolder text-18 mr-3">🧕 참여 멤버</p>
                  <div>{memberSchedule}</div>
                </div>
                <div className="pt-3 font-big flex justify-center">
                  <button
                    className="px-2 py-1 bg-light-gray rounded-md"
                    onClick={onClose}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-black max-w-120 w-120 h-auto p-5 rounded relative flex flex-col items-center z-50"
            onClick={handleModalContentClick}
          >
            <div className="text-3xl bg-pink mb-4">
              [{fanSignDetail.artistFansignTitle}]
            </div>
            {/* 여기에 추가적인 모달 컨텐츠 */}
            <img
              src={fanSignDetail.posterImageUrl}
              alt=""
              className="w-1/2 h-auto p-0 aspect-square"
            />
            <div className="text-lg font-bold">공지</div>
            <div className="m-6 my-3 py-2 whitespace-pre-wrap break-words border-y-2">
              {fanSignDetail.information}
            </div>
            {/* 사인회 일정 관련 */}

            <div className="my-2">
              <div>{applySchedule}</div>
              <div>{fanSignSchedule}</div>
              <div>{memberSchedule}</div>
              <div>
                아티스트 :{' '}
                <button
                  onClick={artistDetail}
                  className="text-pink-500 hover:text-pink-700 font-bold"
                >
                  {artistInfo}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div>
                {fanSignDetail.status === 'SESSION_CONNECTED' ? (
                  <div className="flex gap-6">
                    <button>입장</button>
                    <button
                      className="bg-light-gray rounded w-16"
                      onClick={() => onClose()}
                    >
                      닫기
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="bg-light-gray rounded w-16"
                      onClick={() => onClose()}
                    >
                      닫기
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* 모달을 닫는 버튼 */}
            <button>TEST</button>
            {/* TEST는 나중에 삭제, 지금 테스트에서 입장하기 버튼이 안보임 */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FanSignModal;
