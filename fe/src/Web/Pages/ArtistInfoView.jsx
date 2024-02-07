import React, { useEffect } from 'react';
import ArtistInfo from '../Artist/Mypage/ArtistInfo.jsx';
import NavBar from '../Utils/NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { isArtist } from '../Stores/authReducer.js';

export default function ArtistInfoView() {
  return (
    <>
      <NavBar />
      <ArtistInfo />
    </>
  );
}
