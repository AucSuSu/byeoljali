import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fansignDetail } from '../../Stores/artistFansignReducer';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../axios.js';

export default function FansignModal({ memberFansignId }) {
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
          watch: 1,
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
      width: '500px',
      height: '500px',
      margin: 'auto',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
      >
        {detailData && (
          <div className="font-milk font-bold ml-6 mt-6">
            <h2 className="bolder text-25 flex justify-center mr-6 bg-pink bg-opacity-50 rounded-xl">
              [ {detailData.object.title} ]
            </h2>
            <div class="flex justify-center items-center">
              <img
                src={detailData.object.posterImageUrl}
                alt="커버 이미지"
                className="mt-6 rounded-xl w-48 h-48"
              />
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="bolder">공지</p>
              <p className="mt-2 border-t border-b border-gray-200 py-4">
                {detailData.object.information}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <p className="bolder">응모 일정</p>
              <p>|</p>
              <p>
                {detailData.object.startApplyTime.substring(5, 10)} ~{' '}
                {detailData.object.endApplyTime.substring(5, 10)}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <p className="bolder">사인회 일정</p>
              <p>|</p>
              <p>
                {detailData.object.startFansignTime.substring(5, 10)} /{' '}
                {detailData.object.startFansignTime.substring(11, 16)}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <p className="bolder">개설 멤버</p>
              <p>|</p>
              <p>{detailData.object.memberName}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <p className="bolder">현재 상태</p>
              <p>|</p>
              {detailData.object.status == 'READY_APPLYING' && <p>응모 예정</p>}
              {detailData.object.status == 'APPLYING' && <p>응모 중</p>}
              {detailData.object.status == 'READY_FANSIGN' && (
                <p>사인회 예정</p>
              )}
              {detailData.object.status == 'FANSIGN' && <p>사인회 중</p>}
              {detailData.object.status == 'FINISH' && <p>사인회 종료</p>}
            </div>
            <div className="flex justify-center mt-4">
              {true && (
                <button
                  className="bg-pink text-black px-4 py-3 rounded-xl"
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
        )}
      </Modal>
    </>
  );
}
