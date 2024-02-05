import React from 'react';
import NavBar from '../Utils/NavBar';
import FanApply from '../Fan/FanApply';

function FanApplyView() {
  return (
    <>
      <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat">
        <NavBar isFan={true} />
        <FanApply />
      </div>
    </>
  );
}

export default FanApplyView;
