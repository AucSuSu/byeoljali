import React, { useState } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList(data) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <h1>반복리스트</h1>
      <div>memberfansignId: {data.memberfansignId}</div>
      <div onClick={toggleModal}>posterImageUrl: {data.posterImageUrl}</div>
      <div>artistFansignTitle: {data.artistFansignTitle}</div>
      <div>memberName: {data.memberName}</div>
      <div>startFansignTime: {data.startFansignTime}</div>
      <div>fansignStatus: {data.fansignStatus}</div>

      {isModalVisible && <FanSignModal />}
    </div>
  );
}

export default FanSignList;
