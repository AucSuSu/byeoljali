import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo } from '../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function FansignModal({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleFansignInfo(null));
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
            src={data.profileImageUrl}
            alt={data.title}
            style={{ width: '100px', borderRadius: '50%', cursor: 'pointer' }}
          />
          <ul>
            <li>
              타이틀 <p>{data.title}</p>
            </li>
            <li>
              공지사항 <p>공지사항 필요</p>
            </li>
            <li>
              응모시작 <p>{data.startApplyTime}</p>
            </li>
            <li>
              응모마감 <p>{data.endApplyTime}</p>
            </li>
            <li>
              팬싸인회 <p>{data.startFansignTime}</p>
            </li>
            <li>
              개설맴버 <p>{data.memberName}</p>
            </li>
          </ul>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
