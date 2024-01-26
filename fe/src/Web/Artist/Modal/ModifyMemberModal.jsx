import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyMember } from '../../Stores/modalReducer';
import { modifyMember } from '../../Stores/artistInfoReducer';
import { useDispatch } from 'react-redux';

export default function ModifyMember({ data }) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModifyMember(null));
  };

  const payload = {};
  const modify = (e) => {
    e.preventDefault();
    dispatch(modifyMember(payload));
    closeModal();
  };

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
            src={data.profileImageUrl}
            alt={data.name}
            style={{ width: '400px', borderRadius: '10px' }}
          />
          <p>{data.name}</p>
          <form onSubmit={modify}>
            <button type="submit">수정하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
