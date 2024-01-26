import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';
import Toggle from '../Utils/ToggleButton.jsx';

export default function ArtistFanSignView() {
  const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const [isFansign, setIsFansign] = useState(false);

  const handleToggle = () => {
    setIsFansign(!isFansign);
  };

  console.log(fansignList);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '60px' }}>
        <h1>팬싸 관리 - ({isFansign ? '팬싸 중' : '팬싸 전'})</h1>
        <p onClick={handleToggle}>
          <Toggle />
        </p>

        {isFansign && <Fansign />}
        {!isFansign && <ReadyFansign />}
      </div>
    </>
  );
}
