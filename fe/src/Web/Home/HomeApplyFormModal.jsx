import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import SelectList from './SelectMemberList';

const ApplyFormModal = ({ isModalOpen, closeModal }) => {
  const data = useSelector((state) => state.homedetail.data);
  const [number, setNumber] = useState(0); // 숫자 입력 상태

  const handleChange = (event) => {
    setNumber(event.target.value); // 입력 값으로 상태 업데이트
  };

  const applyForm = () => {};

  if (isModalOpen) {
    console.log('모달 데이터');
    console.log(data);
  }

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
        <input type="number" value={number} onChange={handleChange}></input>
        {/* <button onClick={applyForm}>응모하기</button> */}
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default ApplyFormModal;
