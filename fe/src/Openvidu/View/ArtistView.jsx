import React, { useState } from 'react';
import Artist from '../Artist/Artist';
import ArtistSocket from '../View/ArtistSocket';
import { useLocation } from 'react-router-dom';

export default function ArtistView() {
  const location = useLocation();
  const { propsData } = location.state || {};
  console.log('프롭데이터 : ', propsData);

  const [waitNo, setWaitNo] = useState(null);
  const [joinNo, setJoinNo] = useState(null);
  const [fanData, setfanData] = useState(null);

  const byebye = (e) => {
    setWaitNo(e);
  };
  const inviteFan = (e) => {
    setJoinNo(e);
  };

  const getFanData = (data) => {
    setfanData(data);
  };

  return (
    <div>
      <ArtistSocket
        memberFansignId={propsData.memberFansignId}
        waitNo={waitNo}
        joinNo={joinNo}
        getFanData={getFanData}
      />
      <Artist
        propsData={propsData}
        fanData={fanData}
        inviteFan={inviteFan}
        byebye={byebye}
      />
    </div>
  );
}
