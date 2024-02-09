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
        <div className="w-[80%] ml-[10%]">
          <img
            onClick={toggleModal}
            src={data.posterImageUrl}
            alt="Poster Image"
            className="w-full h-auto aspect-square  cursor-pointer hover:scale-105 transition-transform ease-in-out duration-500 mt-8 mb-2"
          />
          <div>{data.artistFansignTitle}</div>
        </div>

        {isModalVisible && (
          <FanSignModal data={data} onClose={() => setModalVisible(false)} />
        )}
      </div>
    </>
  );
}

export default FanSignList;
