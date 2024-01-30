import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useDispatch } from 'react-redux';
import { createFansign } from '../../Stores/artistFansignReducer';
import ImgUpload from './ImgUpload';

export default function CreateFansignModal({}) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleAddFansign());
  };
  const [time, setTime] = useState('');

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;

    // 시간을 분으로 변환
    const totalMinutes = parseInt(inputTime.split(':')[0]) * 60;

    // 분을 시간으로 다시 변환
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // 시간 형식으로 조합
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    setTime(formattedTime);
  };

  const fansignCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    dispatch(createFansign(formData));
    console.log('팬싸인회 개설 요청');
  };

  const uploadImg = (img) => {
    setImage(img);
    console.log('이미지 데이터 : ', img);
  };

  // 데이터 관리
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [startApplyTime, setStartApplyTime] = useState('');
  const [endApplyTime, setEndApplyTime] = useState('');
  const [mode, setMode] = useState('RANDOM');
  const [startFansignTime, setStartFansignTime] = useState('');
  const [memberIdList, setMemberIdList] = useState([5, 6]);
  const [image, setImage] = useState('');
  //

  const payload = {
    data: {
      title: title,
      information: information,
      startApplyTime: startApplyTime,
      endApplyTime: endApplyTime,
      startFansignTime: startFansignTime,
      mode: mode,
      memberIdList: memberIdList,
      image: image,
    },
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
        contentLabel="테스트입니다"
        style={customStyle}
      >
        <div>
          <h2>타이틀</h2>

          <ImgUpload img={null} uploadImg={uploadImg} />
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
                type="date"
                value={startApplyTime}
                onChange={(e) => setStartApplyTime(e.target.value)}
              />
            </div>
            <div>
              <label>응모마감 : </label>
              <input
                type="date"
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
                type="date"
                value={startFansignTime}
                onChange={(e) => setStartFansignTime(e.target.value)}
              />
              <input type="time" value={time} onChange={handleTimeChange} />
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
