import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import useAxios from '../axios';

import SelectList from './SelectMemberList';

import ApplyReceiptModal from './ApplyReceiptModal';

import { setAlbumNum } from '../Stores/homeDetailListReducer';

const ApplyFormModal = ({ isModalOpen, closeModal, propData }) => {
  const customAxios = useAxios();
  console.log(propData);
  const data = useSelector((state) => state.homedetail.data);
  const currAlbumNum = useSelector((state) => state.homedetail.albumNum);
  const currFansignId = useSelector((state) => state.homedetail.fansignId);
  const currMemberId = useSelector((state) => state.homedetail.memberId);

  const dispatch = useDispatch(); // useDispatch 호출

  const applyForm = async ({ id, data }) => {
    const resData = await customAxios
      .post(`mainpage/apply/${id}`, data)
      .then((res) => {
        console.log('form 제출 완료', res.data);
      });
  };

  const handleSubmit = () => {
    const formData = {
      memberId: currMemberId,
      boughtAlbum: currAlbumNum,
      artistFansignId: currFansignId, // 적절한 ID 값 필요
    };
    applyForm({ id: currFansignId, data: formData });
  };

  const customStyle = {
    content: {
      width: '500px',
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
          <div>
            <p>이미 지원한 팬싸인회입니다.</p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={data.title}
          style={customStyle}
        >
          <div>
            {/* 팬 사인회 명 */}
            <h2>{data?.object?.fansignTitle}</h2>
            {/* 응모 가능 멤버 */}
            <h3>응모</h3>
            {data?.object?.memberList && (
              <SelectList dataList={data?.object?.memberList} />
            )}
            {/* 정보 */}
            <h3>정보</h3>
            <p>{data?.object?.fansignInfo}</p>
            <div>
              {propData.status === 'APPLYING' ? (
                <div>
                  <h3>구매 앨범</h3>
                  <button onClick={openReceiptModal}>영수증 등록하기</button>
                  <input value={data.albumNum}></input>
                  {isReceiptModalOpen && (
                    <ApplyReceiptModal
                      onClose={closeReceiptModal}
                      title={propData.title}
                    />
                  )}
                  <button onClick={() => handleSubmit()}>응모하기</button>
                </div>
              ) : null}
            </div>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplyFormModal;
