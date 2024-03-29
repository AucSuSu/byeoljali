import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddFansign } from '../Stores/modalReducer.js';
import Applying from '../Artist/Fansign/Applying.jsx';
import ReadyApply from '../Artist/Fansign/ReadyApply.jsx';
import CreateFansignModal from '../Artist/Modal/CreateFansignModal.jsx';
import Navbar from '../Utils/NavBar.jsx';
import Toggle from '../Utils/ToggleButton.jsx';
import { useNavigate } from 'react-router-dom';
import { isArtist } from '../Stores/authReducer.js';
import { PlusIcon } from '@heroicons/react/24/solid'; // Heroicons v2에서의 경로

export default function ArtistFanSignView() {
  useEffect(() => {
    if (isArtist === null) {
      alert('로그인해주세요~');
      navigate('/');
    } else if (!isArtist) {
      alert('Fan은 이용 불가능해요~');
      navigate('/home');
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addFansign = useSelector((state) => state.modal.addFansign);
  const [isApplying, setIsApplying] = useState(true);

  const openAddFansignModal = () => {
    dispatch(handleAddFansign());
  };

  const handleToggle = () => {
    setIsApplying(!isApplying);
  };

  const handleOpenFanSignModal = () => {
    openAddFansignModal();
  };

  return (
    <div className="min-h-screen bg-black text-white font-jamsil">
      <Navbar />
      <div className="w-[80%] ml-[10%]">
        <div className="flex items-center justify-between pb-12 mb-6">
          <div className="flex items-center space-x-4 ">
            <h1 className="text-25">응모 팬 사인회 관리</h1>
            <button
              className="flex items-center justify-center p-2 rounded-full border-2 border-gray-300 bg-transparent "
              onClick={openAddFansignModal}
            >
              <PlusIcon className="h-3 w-3" /> {/* 아이콘 크기 조정 */}
            </button>
          </div>
          <Toggle
            type={false}
            isApplying={isApplying}
            toggleApply={handleToggle}
          />
        </div>
      </div>
      <div className="w-[86%] ml-[7%]">
        {addFansign && <CreateFansignModal />}
        {isApplying && <Applying handleAddFansign={handleOpenFanSignModal} />}
        {!isApplying && (
          <ReadyApply handleAddFansign={handleOpenFanSignModal} />
        )}
      </div>
    </div>
  );
}
