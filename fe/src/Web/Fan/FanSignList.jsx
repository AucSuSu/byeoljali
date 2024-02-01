import React, { useState } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList({ data }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <img
        onClick={toggleModal}
        src={data.posterImageUrl}
        alt="Poster Image"
        width="200"
        height="200"
      />
      <div>memberfansignId: {data.memberfansignId}</div>
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
