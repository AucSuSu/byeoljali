import React, { useState } from 'react';
import ApplyFormModal from '../Home/ApplyFormModal';

export default function ArtistInfoModify() {
  const [isOpen, setIsOpen] = useState(true);

  const data = {
    title: '에스파파',
    posterImageUrl: '/aspa.png',
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <ApplyFormModal data={data} isModalOpen="1" closeModal={closeModal} />
      )}
    </>
  );
}
