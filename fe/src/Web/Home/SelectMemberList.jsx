import React, { useState } from 'react';
import './SelectMemberList.css';

const SelectList = ({ dataList }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="image-gallery">
      {Array.isArray(dataList) &&
        dataList.map(
          (
            member,
            index, // dataList 자체를 사용
          ) => (
            <div
              key={index}
              className={`member-item ${selectedImage === index ? 'selected' : 'not-selected'}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={member.profileImageUrl} // profileImageUrl로 변경
                alt={member.name}
                style={{ width: '200px', borderRadius: '10px' }}
              />
              <p>{member.name}</p>
            </div>
          ),
        )}
    </div>
  );
};

export default SelectList;
