import React, { useState, useRef } from 'react';
import './SelectMemberList.css';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../Stores/homeDetailListReducer';

const SelectList = ({ dataList }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch(); // 여기에서 useDispatch 호출

  const select = (index, id) => {
    console.log('데이터 확인 : ', id)
    setSelectedImage(index);
    dispatch(setMemberId(id)); // dispatch 함수 사용
  };

  // 팬싸인회 참여 멤버 목록 좌우 스크롤
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 108; // Adjust the scroll amount as needed

    if (container) {
      if (direction === 'left') {
        console.log('left');
        container.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        console.log('right');
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="flex">
      <button className="m-3" onClick={() => handleScroll('left')}>
        ←
      </button>
      <div
        ref={containerRef}
        className="flex flex-wrap-none overflow-x-auto p-1 item-center hide-scrollbar"
        style={{ width: '450px' }}
      >
        {Array.isArray(dataList) &&
          dataList.map((member, index) => (
            <div //하나의 멤버
              key={index}
              className={`member-item ${selectedImage === index ? 'selected' : 'not-selected'} m-1 flex-none`}
              onClick={() => select(index, member.memberId)}
            >
              <img
                src={member.profileImageUrl}
                alt={member.name}
                style={{
                  width: '103px',
                  height: '103px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
              <p className="mt-2 text-center">{member.name}</p>
            </div>
          ))}
      </div>
      <button className="m-3" onClick={() => handleScroll('right')}>
        →
      </button>
    </div>
  );
};

export default SelectList;
