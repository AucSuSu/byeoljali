import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import SelectList from './SelectMemberList';

import { setAlbumNum, applyForm } from '../Stores/homeDetailListReducer';

const ApplyFormModal = ({ isModalOpen, closeModal }) => {
  const data = useSelector((state) => state.homedetail.data);
  const currAlbumNum = useSelector((state) => state.homedetail.albumNum);
  const currFansignId = useSelector((state) => state.homedetail.fansignId);
  const currMemberId = useSelector((state) => state.homedetail.memberId);

  const dispatch = useDispatch(); // useDispatch 호출

  const handleChange = (event) => {
    dispatch(setAlbumNum(parseInt(event.target.value, 10))); // 숫자로 변환
  };

  const handleSubmit = () => {
    const formData = {
      memberId: currMemberId,
      boughtAlbum: currAlbumNum,
      // fanId: 2,
      artistFansignId: currFansignId, // 적절한 ID 값 필요
    };
    dispatch(applyForm({ id: currFansignId, data: formData }));
  };

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={data.title}
      style={customStyle}
    >
      <div>
        {/* 팬 사인회 명 */}
        <h2>{data?.object?.fansignTitle}</h2> {/* 옵셔널 체이닝 사용 */}
        {/* 응모 가능 멤버 */}
        <h3>응모</h3>
        {data?.object?.memberList && (
          <SelectList dataList={data?.object?.memberList} />
        )}
        {/* 정보 */}
        <h3>정보</h3>
        <p>{data?.object?.fansignInfo}</p> {/* 옵셔널 체이닝 사용 */}
        <h3>구매 앨범</h3>
        <input
          type="number"
          value={data.albumNum}
          onChange={handleChange}
        ></input>
        <button onClick={() => handleSubmit()}>응모하기</button>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default ApplyFormModal;
