import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddFansign } from '../Stores/modalReducer.js';
import Applying from '../Artist/Fansign/Applying.jsx';
import ReadyApply from '../Artist/Fansign/ReadyApply.jsx';
import CreateFansignModal from '../Artist/Modal/CreateFansignModal.jsx';
import Navbar from '../Utils/NavBar.jsx';
import Toggle from '../Utils/ToggleButton.jsx';

export default function ArtistFanSignView() {
  const dispatch = useDispatch();

  const addFansign = useSelector((state) => state.modal.addFansign);
  const [isApplying, setIsApplying] = useState(false);

  const openAddFansignModal = () => {
    dispatch(handleAddFansign());
    console.log('팬싸 추가 : ', addFansign);
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
