import React, { useState } from 'react';
import ArtistInfoModify from '../Artist/ArtistInfoModify.jsx';
import './ArtistInfoView.css';

export default function ArtistInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const openModify = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <h1 style={{ color: 'white' }}>ArtistInfo</h1>
      <h1 className="text-blue-500">ArtistInfo</h1>

      <div>
        <img className="artistImg" src="/aspa.png" alt="에스파임" />
        <div>
          <h3>Aspa</h3>
          <p>SM ENT</p>
          <button onClick={openModify}>{isOpen ? '닫기' : '수정하기'}</button>
        </div>

        {isOpen && <ArtistInfoModify />}
      </div>
    </>
  );
}
