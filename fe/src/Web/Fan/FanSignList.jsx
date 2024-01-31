import React, { useState } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList({ data }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log('fansignlist');

  return (
    <div>
      <h1>반복리스트</h1>
      <div>memberfansignId: {data.memberfansignId}</div>
      <div onClick={toggleModal}>posterImageUrl: {data.posterImageUrl}</div>
      <div>artistFansignTitle: {data.artistFansignTitle}</div>
      <div>memberName: {data.memberName}</div>
      <div>startFansignTime: {data.startFansignTime}</div>
      <div>fansignStatus: {data.fansignStatus}</div>

      {isModalVisible && (
        <FanSignModal data={data} onClose={() => setModalVisible(false)} />
      )}
    </div>
  );
}

export default FanSignList;
