import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleAddMember } from '../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function ArtistInfoModify() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleAddMember());
  };
  const hello = () => {
    console.log('hi~~');
  };
  const data = {
    title: '에스파파',
    posterImageUrl: '/aspa.png',
  };

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
    </>
  );
}
