import React, { useState } from 'react';
import Artist from '../Artist/Artist';
import ArtistSocket from '../View/ArtistSocket';
import { useLocation } from 'react-router-dom';

export default function ArtistView() {
  const location = useLocation();
  const { propsData } = location.state || {};
  const [autoData, setAutoData] = useState({ orders: null, state: null });
  const [fanData, setFanData] = useState(null);

  const timeOver = (e, s) => {
    setAutoData({ orders: e, state: s });
  };
  const inviteFan = (e, s) => {
    setAutoData({ orders: e, state: s });
  };

  const getFanData = (data) => {
    setFanData(data);
    console.log('setFanData 확인 : ', data)
  };

  return (
    <div>
      <ArtistSocket
        memberFansignId={propsData.memberFansignId}
        autoData={autoData}
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
