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
    <div className="bg-pink p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.isArray(dataList) &&
          dataList.map((member, index) => (
            <div
              key={index}
              className={`member-item ${selectedImage === index ? 'selected' : 'not-selected'} flex flex-col items-center m-1`}
              onClick={() => select(index, member.memberId)}
            >
              <img
                src={member.profileImageUrl}
                alt={member.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
              <p className="mt-2 text-center">{member.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectList;
