import React, { useState, useEffect } from 'react';
import Fansign from '../Artist/Fansign/Fansign.jsx';
import ReadyFansign from '../Artist/Fansign/ReadyFansign.jsx';
import Navbar from '../Utils/NavBar.jsx';
import { isArtist } from '../Stores/authReducer.js'
import Toggle from '../Utils/ToggleButton.jsx';
import { useNavigate } from 'react-router-dom';


export default function ArtistFanSignView() {
  
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

  const [isFansign, setIsFansign] = useState(false);
  
  const handleToggle = () => {
    setIsFansign(!isFansign);
  };
  

  return (
    <>
      <Navbar />
      <h1>팬싸 관리 - ({isFansign ? '팬싸 중' : '팬싸 전'})</h1>
      <div onClick={handleToggle}>
        임시 토글
        {/* <Toggle /> */}
      </div>
      {isFansign && <Fansign />}
      {!isFansign && <ReadyFansign />}
    </>
  );
}
