import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyMember } from '../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function MemberInfoModify({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModifyMember(null));
  };

  // const data = {
  //   title: '에스파파',
  //   posterImageUrl: '/aspa.png',
  // };

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
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
            src={data.posterImageUrl}
            alt={data.name}
            style={{ width: '200px', borderRadius: '10px' }}
          />
          <p>맴버 정보 수정</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
