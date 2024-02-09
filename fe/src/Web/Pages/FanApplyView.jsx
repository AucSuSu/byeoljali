import React from 'react';
import NavBar from '../Utils/NavBar';
import FanApply from '../Fan/FanApply';
import { useSelector } from 'react-redux';

function FanApplyView() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <NavBar />
        <FanApply />
      </div>
    </>
  );
}

export default FanApplyView;
