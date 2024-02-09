import React, { useState } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList({ data }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <div className="text-white bg-slate-900 rounded-md">
        <div className="w-[80%] ">
          <img
            onClick={toggleModal}
            src={data.posterImageUrl}
            alt="Poster Image"
            className="w-[80%] cursor-pointer transition-all"
          />
        </div>
        <div>{data.artistFansignTitle}</div>

        {isModalVisible && (
          <FanSignModal data={data} onClose={() => setModalVisible(false)} />
        )}
      </div>
    </>
  );
}

export default FanSignList;
