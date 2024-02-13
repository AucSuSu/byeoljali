import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import useAxios from '../axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// css 추가
import './HomeApplyFormModal.css';

import SelectList from './SelectMemberList';

import ApplyReceiptModal from './ApplyReceiptModal';

const ApplyFormModal = ({ isModalOpen, closeModal, propData }) => {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(propData);
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
    return () => clearInterval(intervalId);
  }, []);

  const customAxios = useAxios();
  const data = useSelector((state) => state.homedetail.data);

  const currAlbumNum = useSelector((state) => state.homedetail.albumNum);
  const currFansignId = useSelector((state) => state.homedetail.fansignId);
  const currMemberId = useSelector((state) => state.homedetail.memberId);

  const applyForm = async ({ id, data }) => {
    const resData = await customAxios
      .post(`mainpage/apply/${id}`, data)
      .then((res) => {
        console.log('form 제출 완료', res.data);
      });
    window.location.reload();
  };

  const handleSubmit = () => {
    console.log('memberId : ' + currMemberId);
    if (currMemberId == null) {
      Swal.fire({
        icon: 'warning',
        title: '맴버를 선택해주세요',
      });
    } else {
      const formData = {
        memberId: currMemberId,
        boughtAlbum: currAlbumNum,
        artistFansignId: currFansignId, // 적절한 ID 값 필요
      };
      applyForm({ id: currFansignId, data: formData });
      Swal.fire({
        icon: 'success',
        title: '성공적으로 응모되었습니다.',
        confirmButtonText: '당첨을 기대하세요', // 버튼 문구 수정
        timer: 3000,
        confirmButtonText: 'OK!',
        background: 'dark-gray',
      }).then((result) => {
        if (result.isConfirmed) {
          closeModal();
        }
      });
    }
  };

  const artistDetail = async () => {
    navigate('/artist-profile', {
      state: {
        propsData: {
          artistId: data.object.artistId,
        },
      },
    });
    closeModal();
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

  //이미 지원한 팬싸
  const smallCustomStyle = {
    content: {
      width: '500px',
      height: '328px',
      margin: 'auto',
      padding: 0,
      zIndex: 2, // z-index 값을 2로 설정
      borderRadius: '20px',
    },
  };

  const customStyle = {
    content: {
      width: '80%', // 모달의 너비를 화면의 80%로 조정
      maxHeight: '90vh', // 모달의 최대 높이를 화면 높이의 90%로 제한
      margin: 'auto',
      padding: '0px', // 패딩 추가로 내용과 모달 테두리 사이 간격 조정
      overflow: 'hidden', // 내용이 모달 높이를 초과해도 스크롤바 생성 방지
      zIndex: 2,
      borderRadius: '20px',
      position: 'relative', // 모달의 위치를 중앙으로 조정하기 위해 relative 설정
    },
  };

  //이중 모달창 관리
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  // 영수증 등록 모달 열기 핸들러
  const openReceiptModal = () => {
    setIsReceiptModalOpen(true);
  };

  // 영수증 등록 모달 닫기 핸들러
  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  return (
    <div>
      {propData.isApplyed ? (
        // Render this content when isApplyed is true
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={data.title}
          style={smallCustomStyle}
        >
          <div className="font-jamsil bg-black text-white p-10 h-[100%]">
            <div className="flex flex-col items-center justify-center ">
              <div className="bolder mb-4 text-25">
                [ {data?.object?.fansignTitle} ]
              </div>
              <p className="text-25">이미 지원한 팬싸인회입니다.</p>
              <button
                className="bg-light-gray text-black px-4 py-2 rounded-lg mt-10"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={data.title}
          style={customStyle}
        >
          <div
            className="flex font-jamsil font-bold bg-black text-white overflow-hidden p-3 "
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
            <div className="w-1/2 p-6 flex justify-center items-align">
              <img
                className="w-[500px] h-[550px]"
                src={data?.object?.posterImageUrl}
                style={{
                  boxShadow: '0 0 10px white, 0 0 20px white, 0 0 30px white',
                 
                }}
              ></img>
            </div>
            <div className="w-1/2 flex-grow p-4">
              <div className="rounded-md">
                <h2
                  className="font-jamsil text-[25px] hot-pink"
                  style={{
                    textShadow:
                      '0 0 10px #FF2990, 0 0 20px #FF2990, 0 0 30px #FF2990',
                  }}
                >
                  [ {data?.object?.fansignTitle} ]
                </h2>
                <div className="pt-3">
                  <p className="text-18 mr-3">📌 공지</p>
                  <div
                    className="border-2 border-deep-dark p-4 rounded-xl font-isa"
                    dangerouslySetInnerHTML={{
                      __html: data?.object?.fansignInfo,
                    }}
                  />
                </div>

                <div className="flex justify-around">
                  <div className="pt-3">
                    <p className="text-18">🗓️ 응모 기간</p>
                    <p className="mt-2 pl-2 pr-4 font-isa">
                      {formatDate(data?.object?.startApplyTime)} {' ~ '}
                      {formatDate(data?.object?.endApplyTime)}
                    </p>
                  </div>
                  <div className="pt-3">
                    <p className="text-18">🗓️ 사인회 일정</p>
                    <p className="mt-2 pl-2 pr-4 font-isa">
                      {formatFansignTime(data?.object?.startFansignTime)}
                    </p>
                  </div>
                  <div className="pt-3">
                    <p className="text-18">🤗 아티스트</p>
                    <p
                      className="mt-2 pl-2 pr-2 font-isa border-b border-white hover:cursor-pointer hover:text-hot-pink hover:border-hot-pink hover:scale-110 inline-block"
                      onClick={artistDetail}
                    >
                      {data?.object?.artistName} ▶︎
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-18 text-center item-center mb-2">
                    참여 멤버
                  </h2>

                  <div className="flex items-center p-4 h-40">
                    <div>
                      {data?.object?.memberList && (
                        <SelectList dataList={data?.object?.memberList} />
                      )}
                    </div>
                  </div>

                  <div>
                    {propData.status === 'APPLYING' ? (
                      <div>
                        <div className="flex justify-center items-center mb-4">
                          <h3 className="pe-3">앨범</h3>
                          <span className="w-16 border-b underline text-center">
                            {currAlbumNum}
                          </span>
                          <span className="ps-3">개 인증 완료</span>
                          <button
                            className="bg-hot-pink px-4 py-2 ml-10 rounded-xl hover:bg-opacity-70"
                            onClick={openReceiptModal}
                          >
                            영수증 인증
                          </button>
                          {isReceiptModalOpen && (
                            <ApplyReceiptModal
                              onClose={closeReceiptModal}
                              title={propData.title}
                            />
                          )}
                        </div>
                        <div className="flex justify-center pl-20 pr-20">
                          <button
                            className="w-3/4 bg-hot-pink text-white px-4 py-2 rounded-xl hover:bg-opacity-70"
                            onClick={() => handleSubmit()}
                          >
                            응모하기
                          </button>
                          <button
                            className="w-1/4 bg-dark-gray text-white px-4 py-2 rounded-xl ml-5 hover:bg-opacity-70"
                            onClick={closeModal}
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* 정보 */}
              </div>{' '}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplyFormModal;
