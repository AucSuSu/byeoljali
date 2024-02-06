import React, { useState, useEffect } from 'react';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';
import { isArtist } from '../Stores/authReducer.js';
import Toggle from '../Utils/ToggleButton.jsx';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
      <Navbar />
      <div className="mt-12 ml-24 mr-14 font-milk font-bold ">
        <div className="flex items-center justify-between pb-12 mb-6">
          <div>
            <h1 className="text-3xl bolder">팬 사인회 관리</h1>
            <p>팬 사인회는 시작 2시간 전부터 입장 가능합니다.</p>
          </div>
          <Toggle
            type={true}
            isApplying={isFansign}
            toggleApply={handleToggle}
          />
        </div>
        {isFansign && <Fansign />}
        {!isFansign && <ReadyFansign />}
      </div>
    </div>
  );
}
