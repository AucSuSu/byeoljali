import React, { useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';

const ListItem = ({ data, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달 관리
  const openModal = () => {
    handleSelectItem(data.artistfansignId.fansignId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 아이템 선택 이벤트 핸들러
  const handleSelectItem = (fansignId) => {
    detailList({ fansignId });
  };

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{ width: '100px', borderRadius: '50%', cursor: 'pointer' }}
        onClick={openModal}
      />
      <p>{data.title}</p>

      <ApplyFormModal
        data={data}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ListItem;
