import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useDispatch } from 'react-redux';
import { createFansign } from '../../Stores/artistFansignReducer';
export default function CreateFansignModal({}) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleAddFansign());
  };

  const payload = {
    // artistId: 1,
    // data: {
    //   title: title,
    //   information: information,
    //   startApplyTime: startApplyTime,
    //   endApplyTime: endApplyTime,
    //   startFansignTime: startFansignTime,
    //   mode: mode,
    //   postImageUrl: postImageUrl,
    //   memberIdList: memberIdList,
    //   image: image,
    // },
  };

  const fansignCreate = (e) => {
    e.preventDefault();
    dispatch(createFansign(payload));
    console.log('팬싸인회 개설 요청');
  };

  // 데이터 관리
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [startApplyTime, setStartApplyTime] = useState('');
  const [endApplyTime, setEndApplyTime] = useState('');
  const [mode, setMode] = useState('');
  const [startFansignTime, setStartFansignTime] = useState('');
  const [memberIdList, setMemberIdList] = useState('');
  const [image, setImage] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  //

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
          <form onSubmit={fansignCreate}>
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
                value={information}
                onChange={(e) => setInformation(e.target.value)}
              />
            </div>
            <div>
              <label>응모시작 : </label>
              <input
                type="text"
                value={startApplyTime}
                onChange={(e) => setStartApplyTime(e.target.value)}
              />
            </div>
            <div>
              <label>응모마감 : </label>
              <input
                type="text"
                value={endApplyTime}
                onChange={(e) => setEndApplyTime(e.target.value)}
              />
            </div>
            <div>
              <label>응모방식 : </label>
              <input
                type="text"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              />
            </div>
            <div>
              <label>팬싸인회 : </label>
              <input
                type="text"
                value={startFansignTime}
                onChange={(e) => setStartFansignTime(e.target.value)}
              />
            </div>
            <div>
              <label> 개설맴버 : </label>
              <input
                type="text"
                value={memberIdList}
                onChange={(e) => setMemberIdList(e.target.value)}
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
