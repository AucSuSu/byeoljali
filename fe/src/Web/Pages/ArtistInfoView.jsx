import React from 'react';
import ArtistInfo from '../Artist/Mypage/ArtistInfo.jsx';
import NavBar from '../Utils/NavBar.jsx';

export default function ArtistInfoView() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <NavBar />
        <ArtistInfo />
      </div>
    </>
  );
}
