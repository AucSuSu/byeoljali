import React, { useState } from 'react';
import './SelectMemberList.css';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../Stores/homeDetailListReducer';

const SelectList = ({ dataList }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch(); // 여기에서 useDispatch 호출

  const select = (index, id) => {
    setSelectedImage(index);
    dispatch(setMemberId(id)); // dispatch 함수 사용
  };

  return (
    <div className="image-gallery">
      {Array.isArray(dataList) &&
        dataList.map((member, index) => (
          <div
            key={index}
            className={`member-item ${selectedImage === index ? 'selected' : 'not-selected'}`}
            onClick={() => select(index, member.memberId)}
          >
            <img
              src={member.profileImageUrl}
              alt={member.name}
              style={{ width: '200px', borderRadius: '10px' }}
            />
            <p>{member.name}</p>
          </div>
        ))}
    </div>
  );
};

export default SelectList;
