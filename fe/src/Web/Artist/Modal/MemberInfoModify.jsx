import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyMember } from '../../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function MemberInfoModify({ data }) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModifyMember(null));
  };

  const modify = () => {};

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={data.name}
        style={customStyle}
      >
        <div>
          <h2>{data.name}</h2>
          <img
            // src={data.posterImageUrl}
            src={'/aspa.png'}
            alt={data.name}
            style={{ width: '400px', borderRadius: '10px' }}
          />
          <button onClick={modify}>수정하기</button>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}