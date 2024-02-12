import React, { useState, useEffect } from 'react';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';
import { isArtist } from '../Stores/authReducer.js';
import Toggle from '../Utils/ToggleButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ArtistFanSignView() {
  useEffect(() => {
    if (isArtist === null) {
      alert('로그인해주세요~');
      navigate('/');
    } else if (!isArtist) {
      alert('Fan은 이용 불가능해요~');
      navigate('/home');
    }
  });

  const navigate = useNavigate();

  const [isFansign, setIsFansign] = useState(true);

  const handleToggle = () => {
    setIsFansign(!isFansign);
  };

  return (
    <div className="min-h-screen bg-black text-white font-big">
      <Navbar />
      <div className="w-[80%] ml-[10%]">
        <div className="flex items-center justify-between pb-12 mb-6">
          <div>
            <h1 className="text-40 bolder">팬 사인회 관리</h1>
            <p className="text-25 text-dark-gray">
              팬 사인회는 시작 2시간 전부터 입장 가능합니다.
            </p>
          </div>
          <Toggle
            type={true}
            isApplying={isFansign}
            toggleApply={handleToggle}
          />
        </div>
      </div>
      {isFansign && <Fansign />}
      {!isFansign && <ReadyFansign />}
    </div>
  );
}
