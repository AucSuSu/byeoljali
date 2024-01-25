import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

export default function AddMemberModal({}) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const modify = () => {};

  const add = () => {};

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
            src={data.posterImageUrl}
            alt={data.name}
            style={{ width: '400px', borderRadius: '10px' }}
          />
          <button onClick={add}>추가하기</button>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
