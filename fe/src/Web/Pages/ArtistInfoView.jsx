import React from 'react';
import ArtistInfo from '../Artist/Mypage/ArtistInfo.jsx';
import NavBar from '../Utils/NavBar.jsx';
// import Socket from '../../Openvidu/Socket.js';

export default function ArtistInfoView() {
  return (
    <>
      <NavBar />
      {/* <Socket /> */}
      <ArtistInfo />
    </>
  );
}
