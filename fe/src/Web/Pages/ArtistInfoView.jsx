import React, { useEffect } from 'react';
import ArtistInfo from '../Artist/Mypage/ArtistInfo.jsx';
import NavBar from '../Utils/NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { isArtist } from '../Stores/authReducer.js'

export default function ArtistInfoView() {
  useEffect(()=>{
    if (isArtist === null){
      alert('로그인해주세요~')
      navigate('/')
    } else if(!isArtist){
      alert('Fan은 이용 불가능해요~')
      navigate('/home')
    }
  })
  const navigate = useNavigate()

  return (
    <>
      <NavBar />
      <ArtistInfo />
    </>
  );
}
