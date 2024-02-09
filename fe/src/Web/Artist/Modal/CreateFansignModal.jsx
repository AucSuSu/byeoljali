import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { handleAddFansign } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import ImgUpload from './ImgUpload';
import useAxios from '../../axios.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CreateFansignModal({}) {
  const [stars, setStars] = useState([]);
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const customAxios = useAxios();
  const [members, setMembers] = useState({ 없음: null });

  useEffect(() => {
    const makeStars = () => {
      const numStars = 50; // 원하는 별의 개수

      const newStars = Array.from({ length: numStars }, (_, index) => ({
        id: index,
        left: Math.random() * 100 + 'vw', // 랜덤한 가로 위치
        top: Math.random() * 100 + 'vh', // 랜덤한 세로 위치
        animationDuration: Math.random() * 1 + 0.5 + 's', // 랜덤한 애니메이션 속도
      }));

      setStars(newStars);
    };

    makeStars();

    // 일정 시간마다 별의 위치를 재설정
    const intervalId = setInterval(() => {
      makeStars();
    }, 5000);

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

    // 컴포넌트가 언마운트되면 interval 제거
    return () => clearInterval(intervalId);
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
    endApplyTime: `${endApplyTime} 23:59:59`,
    startFansignTime: `${startFansignDate} ${startFansignHour}:00:00`,
    mode: selectedMode,
    memberIdList: memberIdList,
    image: image,
  };

  const customStyle = {
    content: {
      width: '1200px',
      height: '850px',
      margin: 'auto',
      padding: 0,
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
        <div
          className="flex font-big bg-black overflow-hidden p-3"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                animationDuration: star.animationDuration,
              }}
            ></div>
          ))}
          <div className="w-1/2">
            <h2 className="text-40 text-white mb-6 ms-10">FANSIGN</h2>
            <ImgUpload img={null} uploadImg={uploadImg} />
          </div>
          <div className="w-1/2">
            <div className="font-big ml-3">
              <form onSubmit={fansignCreate}>
                <div className="mt-20 flex flex-col ">
                  <label className="text-hot-pink pb-1">타이틀</label>
                  <input
                    type="text"
                    value={title}
                    className="border-b border-gray-300 focus:border-hot-pink outline-none w-100 text-black p-3 rounded-xl"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-6 flex flex-col">
                  <label className="text-hot-pink pb-1">공지사항 </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={information}
                    config={{
                      // 이미지 업로드 비활성화
                      toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                      ],
                      placeholder: '공지사항을 입력해주세요!',
                      editorStyles: {
                        color: 'black', // 텍스트 색상을 검정색으로 지정
                      },
                    }}
                    onReady={(editor) => {
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const newData = editor.getData();
                      setInformation(newData);
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </div>
                <div className="mt-14 flex flex-col">
                  <label className="text-hot-pink pb-1">앨범명</label>
                  <input
                    type="text"
                    value="앨범명"
                    className="border-b border-gray-300 focus:border-hot-pink outline-none w-100 text-black p-3 rounded-xl p-1"
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <label className="text-hot-pink">응모시작 </label>
                  <input
                    type="date"
                    className="ml-3 text-black rounded-xl p-1"
                    min={startApplyTime}
                    value={startApplyTime}
                    onChange={(e) => setStartApplyTime(e.target.value)}
                  />
                  <label className="text-hot-pink ms-3">응모마감 </label>
                  <input
                    type="date"
                    className="ml-3 text-black rounded-xl p-1"
                    min={startApplyTime}
                    value={endApplyTime}
                    onChange={(e) => setEndApplyTime(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <label className="text-hot-pink">응모방식 </label>
                  <div className="ml-4 text-white">
                    <label htmlFor="modeRandom">Random</label>
                    <input
                      type="checkbox"
                      id="modeRandom"
                      className="ml-3 text-black"
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
                      className="ml-3 text-black"
                      checked={mode.line}
                      onChange={() => {
                        handleModeCheck('DESC');
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 mb-8 flex items-center">
                  <label className="text-hot-pink">팬싸인회 시작 시간</label>
                  <input
                    type="date"
                    className="ml-3 text-black rounded-xl p-1"
                    min={endApplyTime}
                    value={startFansignDate}
                    onChange={(e) => setStartFansignDate(e.target.value)}
                  />
                  <select
                    value={startFansignHour}
                    className="ml-3 text-black rounded-xl p-1"
                    onChange={(e) => setStartFansignHour(e.target.value)}
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={String(hour).padStart(2, '0')}>
                        {String(hour).padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-18 text-center  text-white">개설 멤버</p>
                <div className="text-white bg-pink px-4 py-4 rounded-xl  grid grid-cols-4 gap-4 mt-2 mb-3">
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
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-hot-pink text-black px-4 py-2 rounded-xl"
                  >
                    개설하기
                  </button>
                  <button
                    className="bg-light-gray text-black px-3 py-1 rounded-xl ml-5"
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
