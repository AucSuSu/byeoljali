import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';
import Toggle from '../Utils/ToggleButton.jsx';

export default function ArtistFanSignView() {
  const [isFansign, setIsFansign] = useState(false);

  const handleToggle = () => {
    setIsFansign(!isFansign);
  };

  return (
    <>
      <Navbar />
      <h1>팬싸 관리 - ({isFansign ? '팬싸 중' : '팬싸 전'})</h1>
      <div onClick={handleToggle}>
        임시 토글
        {/* <Toggle /> */}
      </div>
      {isFansign && <Fansign />}
      {!isFansign && <ReadyFansign />}
    </>
  );
}
