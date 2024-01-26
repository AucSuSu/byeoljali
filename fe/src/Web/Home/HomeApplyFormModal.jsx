import React from 'react';
import Modal from 'react-modal';

import SelectList from './SelectMemberList';

const ApplyFormModal = ({ data, isModalOpen, closeModal }) => {
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
        <h2>{data.title}</h2>
        {/* 응모 가능 멤버 */}
        <SelectList />
        <p>Other details about the item...</p>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default ApplyFormModal;
