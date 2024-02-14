import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fansignDetail } from '../../Stores/artistFansignReducer';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../axios.js';

export default function FansignModal({ memberFansignId }) {
  const [stars, setStars] = useState([]);

  const detailData = useSelector((state) => state.artistFansign.detail);

  const customAxios = useAxios();
  const modalIsOpen = true;

  const getFansignDetail = async () => {
    const response = await customAxios
      .get(`memberfansign/${memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    dispatch(fansignDetail(response));
  };

  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterFansign/${memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    getFansignDetail();
  }, []);

  const closeModal = () => {
    dispatch(handleFansignInfo(null));
  };

  const participate = async () => {
    const openviduData = await joinFansign();
    navigate('/artist-fansign', {
      state: {
        propsData: {
          sessionId: openviduData.object.sessionId,
          tokenId: openviduData.object.tokenId,
          memberFansignId: memberFansignId,
          title: detailData.object.title,
          member: detailData.object.memberName,
          artistFansignId: detailData.object.artistFansignId,
        },
      },
    });
    closeModal();
  };

  const customStyle = {
    content: {
      width: '80%', // 모달의 너비를 화면의 80%로 조정
      geight: '90vh', // 모달의 최대 높이를 화면 높이의 90%로 제한
      margin: 'auto',
      padding: '0px', // 패딩 추가로 내용과 모달 테두리 사이 간격 조정
      overflow: 'hidden', // 내용이 모달 높이를 초과해도 스크롤바 생성 방지
      zIndex: 2,
      borderRadius: '20px',
      position: 'relative', // 모달의 위치를 중앙으로 조정하기 위해 relative 설정
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
        // className="overflow-hidden"
      >
        {detailData && (
          <div className="flex h-[100%] font-jamsil bg-black p-6">
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
            <div className="w-1/2 h-auto flex items-center justify-center ">
              <div>
                <img
                  src={detailData.object.posterImageUrl}
                  alt="커버 이미지"
                  className="h-[480px] w-[90%] ml-5 "
                  style={{
                    boxShadow: '0 0 10px white, 0 0 20px white, 0 0 30px white',
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 h-full text-white pt-2 pl-2 flex flex-col justify-center">
              <div className="font-jamsil flex flex-col justify-between h-[90%]">
                <h2
                  className="font-jamsil bolder text-40 hot-pink"
                  style={{
                    textShadow:
                      '0 0 10px #FF2990, 0 0 20px #FF2990, 0 0 30px #FF2990',
                  }}
                >
                  [ {detailData.object.title} ]
                </h2>

                <div className="mt-6 mb-3 flex flex-col pl-2">
                  <p className="">📌 공지</p>
                  <div
                    className="border-2 border-deep-dark p-4 rounded-xl font-isa"
                    dangerouslySetInnerHTML={{
                      __html: detailData.object.information,
                    }}
                  />
                </div>
                <div className="mb-3">
                  <div className="ml-3 ">🗓️ 응모 일정</div>
                  <p className="ml-6">
                    {detailData.object.startApplyTime.substring(5, 10)} ~{' '}
                    {detailData.object.endApplyTime.substring(5, 10)}
                  </p>{' '}
                </div>
                <div className="mb-3">
                  <div className="ml-3">🗓️ 사인회 일정</div>
                  <p className="ml-6">
                    {detailData.object.startFansignTime.substring(5, 10)} /{' '}
                    {detailData.object.startFansignTime.substring(11, 16)}
                  </p>{' '}
                </div>
                <div className="mb-3">
                  <div className="ml-3">🤗 개설 멤버</div>
                  <p className="ml-6">{detailData.object.memberName}</p>
                </div>
                <div className="mb-3">
                  <div className="ml-3"> ✔ 현재 상태</div>
                  {detailData.object.status == 'READY_APPLYING' && (
                    <p className="ml-6">응모 예정</p>
                  )}
                  {detailData.object.status == 'APPLYING' && (
                    <p className="ml-6">응모 중</p>
                  )}
                  {detailData.object.status == 'READY_FANSIGN' && (
                    <p className="ml-6">사인회 예정</p>
                  )}
                  {(detailData.object.status === 'FANSIGN' ||
                    detailData.object.status === 'SESSION_CONNECTED') && (
                    <p className="ml-6">사인회 중</p>
                  )}
                  {detailData.object.status == 'FINISH' && (
                    <p className="ml-6">사인회 종료</p>
                  )}
                </div>

                <div className="flex justify-center mt-4">
                  {(detailData.object.status === 'FANSIGN' ||
                    detailData.object.status === 'SESSION_CONNECTED') && (
                    <button
                      className="bg-hot-pink text-white px-4 py-3 rounded-xl"
                      onClick={participate}
                    >
                      사인회 참여
                    </button>
                  )}
                  <button
                    className="bg-light-gray text-black px-4 py-3 rounded-xl ml-5"
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
