import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import useAxios from '../axios';

import SelectList from './SelectMemberList';

import ApplyReceiptModal from './ApplyReceiptModal';

const ApplyFormModal = ({ isModalOpen, closeModal, propData }) => {
  const customAxios = useAxios();
  // console.log(propData);
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
    const formData = {
      memberId: currMemberId,
      boughtAlbum: currAlbumNum,
      artistFansignId: currFansignId, // 적절한 ID 값 필요
    };
    applyForm({ id: currFansignId, data: formData });
    closeModal();
  };

  const customStyle = {
    content: {
      width: '700px',
      height: '500px',
      margin: 'auto',
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
          style={customStyle}
        >
          <div className="flex flex-col items-center justify-center h-full bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
            <div className="flex flex-col items-center justify-center p-4 overflow-y-auto">
              <h1 className="bolder mb-4 text-25">
                [ {data?.object?.fansignTitle} ]
              </h1>
              <p className="bolder mb-4 text-25">이미 지원한 팬싸인회입니다.</p>
              <button
                className="bg-light-gray px-4 py-2 rounded-lg mt-10"
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
          <div className="font-milk font-bold">
            <h2 className="text-center bolder text-25">
              [ {data?.object?.fansignTitle} ]
            </h2>
            <div className="flex flex-col items-center mt-8 ml-12 mr-12">
              <p className="bolder text-18">공지</p>
              <p className="mt-2 border-t border-b border-gray-200 py-4 ">
                {data?.object?.fansignInfo}
              </p>
            </div>

            <div className="flex mt-8 ml-12">
              <h2 className="bolder min-w-[80px]">응모 일정</h2>
              <p className="ml-4 mr-4">|</p>
              <p>
                {data?.object?.startApplyTime.slice(5, 10)} ~{' '}
                {data?.object?.endApplyTime.slice(5, 10)}
              </p>
            </div>

            <div className="flex mt-2 ml-12">
              <h2 className="bolder min-w-[80px]">사인회 일정</h2>
              <p className="ml-4 mr-4">|</p>
              <p>
                {data?.object?.startFansignTime.slice(5, 10)} /{' '}
                {data?.object?.startFansignTime.slice(11, 16)}
              </p>
            </div>

            <h2 className="bolder text-18 text-center mt-8 mb-6">참여 멤버</h2>

            {data?.object?.memberList && (
              <SelectList dataList={data?.object?.memberList} />
            )}
            {/* 정보 */}

            <div>
              {propData.status === 'APPLYING' ? (
                <div>
                  <div className="flex justify-center items-center space-x-2 mt-6 mb-6">
                    <h3>구매 앨범</h3>
                    <div className="border-b border-gray focus:border-hot-pink focus:outline-none w-16">
                      {data.albumNum}
                    </div>
                    <button
                      className="bg-pink px-4 py-2 rounded-xl"
                      onClick={openReceiptModal}
                    >
                      영수증 등록
                    </button>
                    {isReceiptModalOpen && (
                      <ApplyReceiptModal
                        onClose={closeReceiptModal}
                        title={propData.title}
                      />
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-hot-pink text-black px-4 py-2 rounded-xl"
                      onClick={() => handleSubmit()}
                    >
                      응모
                    </button>
                    <button
                      className="bg-light-gray text-black px-4 py-2 rounded-xl ml-5"
                      onClick={closeModal}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplyFormModal;
