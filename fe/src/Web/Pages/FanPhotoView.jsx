import React from 'react';

import FanPhoto from '../Fan/FanPhoto';
import { useSelector } from 'react-redux';

function FanPhotoView() {
  // axios.get으로 유저의 인생네컷을 모두 받았다고 가정\
  const photoData = useSelector((state) => state.fanphoto.data);

  return (
    <div>
      <h1>인생네컷</h1>
      {photoData.map((data, index) => (
        <FanPhoto key={index} data={data} />
      ))}
    </div>
  );
}

export default FanPhotoView;
