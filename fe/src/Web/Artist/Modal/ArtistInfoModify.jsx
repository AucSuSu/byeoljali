import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyArtist } from '../../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function ArtistInfoModify({ data }) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModifyArtist());
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
        contentLabel={data.name}
        style={customStyle}
      >
        <div>
          <h2>{data.name}</h2>
          <img
            src={data.artistImageUrl}
            alt={data.name}
            style={{ width: '200px', borderRadius: '10px' }}
          />
          <p>아티스트(그룹)정보 수정</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
