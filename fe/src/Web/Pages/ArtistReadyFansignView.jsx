import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';

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
      <div>
        <h1>맴버 리스트</h1>
        <button onClick={handleToggle}>toggle</button>

        {isFansign && <Fansign />}
        {!isFansign && <ReadyFansign />}
      </div>
    </>
  );
}
