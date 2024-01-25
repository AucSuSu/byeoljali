import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddFansign } from '../Stores/modalReducer.js';
import Applying from '../Artist/Fansign/Applying.jsx';
import ReadyApply from '../Artist/Fansign/ReadyApply.jsx';
import AddFansignModal from '../Artist/Modal/AddFansignModal.jsx';

export default function ArtistFanSignView() {
  const dispatch = useDispatch();

  const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const addFansign = useSelector((state) => state.modal.addFansign);
  const [isApplying, setIsApplying] = useState(false);

  const openAddFansignModal = () => {
    dispatch(handleAddFansign());
    console.log('팬싸 추가 : ', addFansign);
  };

  const handleToggle = () => {
    setIsApplying(!isApplying);
  };

  console.log(fansignList);
  return (
    <>
      <div>
        <h1>맴버 리스트</h1>
        <button onClick={handleToggle}>toggle</button>
        <button onClick={openAddFansignModal}>add Fansign</button>
        {addFansign && <AddFansignModal />}

        {isApplying && <Applying />}
        {!isApplying && <ReadyApply />}
      </div>
    </>
  );
}
