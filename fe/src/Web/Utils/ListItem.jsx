import React, { useState } from 'react';
import ApplyFormModal from '../Home/ApplyFormModal';

const ListItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
