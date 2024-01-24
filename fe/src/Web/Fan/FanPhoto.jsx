import React, { useState } from 'react';
import FanModal from './FanModal';

function FanPhoto({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePayment = () => {
    console.log('결제 로직 처리');
    setIsModalOpen(false);
    // 결제 처리 로직
  };

  const handleDelete = () => {
    console.log('삭제 로직 처리');
    setIsModalOpen(false);
    // 삭제 처리 로직
  };

  return (
    <div>
      <img
        src={data.photoUrl}
        alt={`사진 ${data.photoId}`}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <p>팬싸인회 제목: {data.artistFansignTitle}</p>
      <p>시작 시간: {data.startFansignTime}</p>
      <p>결제 여부: {data.pay === true ? '결제함' : '결제안함'}</p>
      {isModalOpen && (
        <FanModal
          onClose={handleCloseModal}
          onPay={handlePayment}
          onDelete={handleDelete}
          data={data}
        />
      )}
    </div>
  );
}

export default FanPhoto;
