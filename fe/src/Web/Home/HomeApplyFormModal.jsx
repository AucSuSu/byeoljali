import React from 'react';
import Modal from 'react-modal';

import List from './HomeApplyList';

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
        <List type="member"></List>
        <img
          src={data.posterImageUrl}
          alt={data.title}
          style={{ width: '200px', borderRadius: '10px' }}
        />
        <p>Other details about the item...</p>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default ApplyFormModal;
