import React, { useEffect } from 'react';

import FanPhoto from '../Fan/FanPhoto';
import { useSelector, useDispatch } from 'react-redux';

import { getUserPhoto } from '../Stores/fanPhotoReducer';

import NavBar from '../Utils/NavBar';

function FanPhotoView() {
  // axios.get으로 유저의 인생네컷을 모두 받았다고 가정\
  const photoData = useSelector((state) => state.fanphoto.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPhoto());
  }, [dispatch]);

  if (Array.isArray(photoData)) {
    // photoData is an array, safe to use .map()
    return (
      <div>
        <NavBar isFan={true} />
        {photoData.map((data, index) => (
          <FanPhoto key={index} data={data} />
        ))}
      </div>
    );
  } else {
    // Handle the case when photoData is not an array
    return <div>Loading or No photos available...</div>;
  }
}

export default FanPhotoView;
