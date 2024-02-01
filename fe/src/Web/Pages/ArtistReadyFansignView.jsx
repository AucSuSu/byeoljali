import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddFansign } from '../Stores/modalReducer.js';
import Applying from '../Artist/Fansign/Applying.jsx';
import ReadyApply from '../Artist/Fansign/ReadyApply.jsx';
import CreateFansignModal from '../Artist/Modal/CreateFansignModal.jsx';
import Navbar from '../Utils/NavBar.jsx';
import Toggle from '../Utils/ToggleButton.jsx';
import { useNavigate } from 'react-router-dom';
import { isArtist } from '../Stores/authReducer.js'

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
  const dispatch = useDispatch();

  const addFansign = useSelector((state) => state.modal.addFansign);
  const [isApplying, setIsApplying] = useState(false);

  const openAddFansignModal = () => {
    dispatch(handleAddFansign());
  };

  const handleToggle = () => {
    setIsApplying(!isApplying);
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '60px' }}>
        <div>
          <h1>팬싸 관리 - ({isApplying ? '응모 중' : '응모 전'})</h1>
          <div onClick={handleToggle}>
            임시토글
            {/* <Toggle /> */}
          </div>
          <button onClick={openAddFansignModal}>add Fansign</button>
        </div>

        {addFansign && <CreateFansignModal />}
        {isApplying && <Applying />}
        {!isApplying && <ReadyApply />}
      </div>
    </>
  );
}
