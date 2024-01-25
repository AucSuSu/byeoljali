import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useDispatch } from 'react-redux';

export default function AddFansignModal({}) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleAddFansign());
  };

  const createFansign = (e) => {
    e.preventDefault();
    console.log('팬싸인회 개설 요청');
  };

  // 데이터 관리
  const [title, setTitle] = useState('');
  const [notice, setNotice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entryMethod, setEntryMethod] = useState('');
  const [fanSign, setFanSign] = useState('');
  const [createMember, setCreateMember] = useState('');
  //

  useEffect(() => {
    // dispatch() // 실제 axios 요청으로 변경
  }, []);

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
        contentLabel="테스트입니다"
        style={customStyle}
      >
        <div>
          <h2>타이틀</h2>
          <form onSubmit={createFansign}>
            <div>
              <label>타이틀 : </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>공지사항 : </label>
              <input
                type="text"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              />
            </div>
            <div>
              <label>응모시작 : </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>응모마감 : </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label>응모방식 : </label>
              <input
                type="text"
                value={entryMethod}
                onChange={(e) => setEntryMethod(e.target.value)}
              />
            </div>
            <div>
              <label>팬싸인회 : </label>
              <input
                type="text"
                value={fanSign}
                onChange={(e) => setFanSign(e.target.value)}
              />
            </div>
            <div>
              <label> 개설맴버 : </label>
              <input
                type="text"
                value={createMember}
                onChange={(e) => setCreateMember(e.target.value)}
              />
            </div>
            <button type="submit">팬싸인 개설하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
