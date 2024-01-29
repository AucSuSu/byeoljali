import React, { useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';

// Reducer 추가
import { useDispatch } from 'react-redux';
import {
  detailList,
  clearData,
  setFansignId,
} from '../Stores/homeDetailListReducer';

const ListItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 모달 관리
  const openModal = () => {
    // dispatch를 사용하여 detailList 액션을 호출
    dispatch(setFansignId(data.artistfansignId));
    dispatch(detailList(data.artistfansignId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearData()); // data를 빈 배열로 초기화하는 액션을 디스패치
    setIsModalOpen(false);
  };

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => openModal()} // onClick 핸들러를 수정
      />
      <p>{data.title}</p>

      <ApplyFormModal
        fansignId={data.artistfansignId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ListItem;
