import React, { useEffect } from 'react';
import './SelectMemberList.css';

// Reducer 추가
import { detailList } from '../Stores/homeListReducer';

const SelectList = () => {
  console.log('팬 사인회 정보');
  console.log(detailList);

  return (
    <div className="image-gallery">
      <h1>멤버 리스트</h1>
      {/* {images.map((data, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={`gallery-image ${selectedImage === index ? '' : 'inactive'}`}
          onClick={() => setSelectedImage(index)}
        />
      ))}
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{ width: '200px', borderRadius: '10px' }}
      /> */}
    </div>
  );
};

export default SelectList;
