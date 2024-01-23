import React from 'react';
import Modal from 'react-modal';

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
        <h2>{data.title}</h2>
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
