import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import SelectList from './SelectMemberList';

import { setAlbumNum, applyForm } from '../Stores/homeDetailListReducer';

const ApplyFormModal = ({ isModalOpen, closeModal }) => {
  const data = useSelector((state) => state.homedetail.data);
  const dispatch = useDispatch(); // useDispatch 호출

  if (data.fansignId != undefined) {
    console.log('modal fansignId');
    console.log(data.fansignId);
  }

  const handleChange = (event) => {
    dispatch(setAlbumNum(event.target.value)); // 입력 값으로 상태 업데이트
  };

  const handleSubmit = () => {
    const formData = {
      memberId: data.memberId,
      boughtAlbum: data.albumNum,
      fanId: 2,
      artistFansignId: data.fansignId, // 적절한 ID 값 필요
    };

    console.log('handleSubmit');
    console.log(data);
    console.log(data.fansignId);
    dispatch(applyForm({ id: data.fansignId, data: formData }));
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
