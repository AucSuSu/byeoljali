import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { createFansign } from '../../Stores/artistFansignReducer';
import ImgUpload from './ImgUpload';

export default function CreateFansignModal({}) {
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const members = artistData.object.memberList
    .map((e) => [e.name, e.memberId])
    .reduce((acc, [name, memberId]) => {
      acc[name] = memberId;
      return acc;
    }, {});
  console.log('맴버 : ', members);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleAddFansign());
  };

  const fansignCreate = (e) => {
    e.preventDefault();
    console.log('페이로드 : ', payload);

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    console.log('폼데이터 : ', formData);
    dispatch(createFansign(formData));
    console.log('팬싸인회 개설 요청');
  };

  const uploadImg = (img) => {
    setImage(img);
    console.log('이미지 데이터 : ', img);
  };

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMode, setSeletcedMode] = useState(null);

  const handleModeCheck = (mode) => {
    if (mode === 'random') {
      setMode({ random: true, line: false });
    } else {
      setMode({ random: false, line: true });
    }
    setSeletcedMode(mode);
  };

  const handleMemberCheck = (key) => {
    if (selectedMembers.includes(key)) {
      setSelectedMembers(
        selectedMembers.filter((selectedMember) => selectedMember !== key),
      );
    } else {
      setSelectedMembers([...selectedMembers, key]);
    }
    console.log(memberIdList);
  };

  // 데이터 관리
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [startApplyTime, setStartApplyTime] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [endApplyTime, setEndApplyTime] = useState('');
  const [mode, setMode] = useState({ random: false, line: false });
  const [startFansignDate, setStartFansignDate] = useState('');
  const [startFansignHour, setStartFansignHour] = useState('');
  const [image, setImage] = useState('');
  const memberIdList = selectedMembers.map((key) => members[key]);
  //

  const payload = {
    title: title,
    information: information,
    startApplyTime: `${startApplyTime} 12:00:00`,
    endApplyTime: `${endApplyTime} 12:00:00`,
    startFansignTime: `${startFansignDate} ${startFansignHour}:00:00`,
    mode: selectedMode,
    memberIdList: memberIdList,
    image: image,
  };

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
    },
  };

  const test = () => {
    console.log('시간 : ', payload.startFansignTime);
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
      >
        <div>
          <h2 onClick={test}>타이틀</h2>

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
                min={startApplyTime}
                value={startApplyTime}
                onChange={(e) => setStartApplyTime(e.target.value)}
              />
            </div>
            <div>
              <label>응모마감 : </label>
              <input
                type="date"
                min={startApplyTime}
                value={endApplyTime}
                onChange={(e) => setEndApplyTime(e.target.value)}
              />
            </div>
            <div>
              <label>응모방식 : </label>
              <label htmlFor="modeRandom">Random</label>
              <input
                type="checkbox"
                id="modeRandom"
                checked={mode.random}
                onChange={() => {
                  handleModeCheck('random');
                }}
              />
              <label htmlFor="modeLine">Line</label>
              <input
                type="checkbox"
                id="modeLine"
                checked={mode.line}
                onChange={() => {
                  handleModeCheck('line');
                }}
              />
            </div>
            <div>
              <label>팬싸인회 : </label>
              <input
                type="date"
                min={endApplyTime}
                value={startFansignDate}
                onChange={(e) => setStartFansignDate(e.target.value)}
              />
              <select
                value={startFansignHour}
                onChange={(e) => setStartFansignHour(e.target.value)}
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={String(hour).padStart(2, '0')}>
                    {String(hour).padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>
            <div>
              {Object.keys(members).map((member) => (
                <div key={member}>
                  <label>{member}</label>
                  <input
                    type="checkbox"
                    id={member}
                    checked={selectedMembers.includes(member)}
                    onChange={() => handleMemberCheck(member)}
                  />
                </div>
              ))}
            </div>
            <button type="submit">팬싸인 개설하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
