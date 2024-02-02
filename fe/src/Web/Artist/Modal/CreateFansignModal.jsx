import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import ImgUpload from './ImgUpload';
import useAxios from '../../axios.js';

export default function CreateFansignModal({}) {
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const customAxios = useAxios();
  const [members, setMembers] = useState({ 없음: null });

  useEffect(() => {
    if (artistData) {
      const checkMemberList = artistData.object.memberList
        .map((e) => [e.name, e.memberId])
        .reduce((acc, [name, memberId]) => {
          acc[name] = memberId;
          return acc;
        }, {});
      setMembers(checkMemberList);
      console.log('맴버 : ', members);
    }
  }, [artistData]);

  const joinFansign = async (formData) => {
    const response = await customAxios
      .post(`artists/fansign`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  };

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleAddFansign());
  };

  const fansignCreate = (e) => {
    e.preventDefault();
    console.log('가공전 데이터 : ', payload);
    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    joinFansign(formData);
    console.log('팬싸인회 개설 요청');
    closeModal();
  };

  const uploadImg = (img) => {
    setImage(img);
  };

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMode, setSeletcedMode] = useState(null);

  const handleModeCheck = (mode) => {
    if (mode === 'RANDOM') {
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

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
      >
        <div className="font-milk font-bold ml-6 mt-6">
          <h2 className="text-25 bolder mb-6">응모 폼 개설</h2>

          <ImgUpload img={null} uploadImg={uploadImg} />

          <form onSubmit={fansignCreate}>
            <div className="mt-6 flex items-center ">
              <label className="w-32">타이틀</label>
              <input
                type="text"
                value={title}
                className="border-b border-gray-300 focus:border-hot-pink outline-none w-100"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <label className="w-32">공지사항 </label>
              <input
                type="text"
                value={information}
                className="border-b border-gray-300 focus:border-hot-pink outline-none w-100"
                onChange={(e) => setInformation(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <label className="w-32">응모시작 </label>
              <input
                type="date"
                min={startApplyTime}
                value={startApplyTime}
                onChange={(e) => setStartApplyTime(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <label className="w-32">응모마감 </label>
              <input
                type="date"
                min={startApplyTime}
                value={endApplyTime}
                onChange={(e) => setEndApplyTime(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <label className="w-32">응모방식 </label>
              <label htmlFor="modeRandom">Random</label>
              <input
                type="checkbox"
                id="modeRandom"
                className="ml-1"
                checked={mode.random}
                onChange={() => {
                  handleModeCheck('RANDOM');
                }}
              />
              <label className="ml-4" htmlFor="modeLine">
                Line
              </label>
              <input
                type="checkbox"
                id="modeLine"
                className="ml-1"
                checked={mode.line}
                onChange={() => {
                  handleModeCheck('DESC');
                }}
              />
            </div>
            <div className="mt-2 mb-8 flex items-center">
              <label className="w-32">팬싸인회 </label>
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

            <p className="text-18 text-center bolder">개설 멤버</p>
            <div className="bg-pink px-4 py-4 rounded-xl bolder grid grid-cols-4 gap-4 mt-2 mb-8">
              {Object.keys(members).map((member) => (
                <div key={member}>
                  <input
                    type="checkbox"
                    id={member}
                    checked={selectedMembers.includes(member)}
                    onChange={() => handleMemberCheck(member)}
                  />
                  <label className="ml-2">{member}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-pink text-black px-4 py-3 rounded-xl"
              >
                개설
              </button>
              <button
                className="bg-light-gray text-black px-4 py-3 rounded-xl ml-5"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
