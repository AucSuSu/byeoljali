import React from 'react';
import ArtistInfo from '../Artist/Mypage/ArtistInfo.jsx';
import NavBar from '../Utils/NavBar.jsx';

export default function ArtistInfoView() {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: '60px' }}>
        <ArtistInfo />
      </div>
    </>
  );
}
