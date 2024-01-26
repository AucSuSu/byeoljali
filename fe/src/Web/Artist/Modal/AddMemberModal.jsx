import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addMember } from '../../Stores/artistInfoReducer';

export default function AddMemberModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const payload = {
    artistId: 1,
    name: name,
    profileImageUrl: profileImageUrl,
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(addMember(payload));
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
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="맴버를 추가해주세요"
        style={customStyle}
      >
        <div>
          <h2>맴버를 추가해주세요</h2>
          <form onSubmit={add}>
            <div>
              <label>프로필 사진(바꿔야함) : </label>
              <input
                type="text"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label>이름 : </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">추가하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
