import React, { useState } from 'react';
import FanSignModal from './FanSignModal';

function FanSignList({ data }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <div className="text-center font-milk ml-20 mb-10 inline-block relative">
        <div className="relative w-[250px] h-[250px] ">
          <img
            onClick={toggleModal}
            src={data.posterImageUrl}
            alt="Poster Image"
            className="w-full h-full"
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
