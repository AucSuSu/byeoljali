import React, { useState } from 'react';
import Artist from '../Artist/Artist';
import ArtistSocket from '../View/ArtistSocket';
import { useLocation } from 'react-router-dom';

export default function ArtistView() {
  const location = useLocation();
  const { propsData } = location.state || {};

  const [closeNo, setCloseNo] = useState(null);
  const [joinNo, setJoinNo] = useState(null);
  const [fanData, setFanData] = useState(null);

  const timeOver = (e) => {
    setCloseNo(e);
  };
  const inviteFan = (e) => {
    setJoinNo(e);
  };

  const getFanData = (data) => {
    setFanData(data);
  };

  return (
    <div>
      <ArtistSocket
        memberFansignId={propsData.memberFansignId}
        closeNo={closeNo}
        joinNo={joinNo}
        getFanData={getFanData}
      />
      <Artist
        propsData={propsData}
        fanData={fanData}
        inviteFan={inviteFan}
        timeOver={timeOver}
      />
    </div>
  );
}
