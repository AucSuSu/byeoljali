import React from 'react';
import NavBar from '../Utils/NavBar';
import FanApply from '../Fan/FanApply';

function FanApplyView() {
  return (
    <>
      <NavBar isFan={true} />
      <FanApply />
    </>
  );
}

export default FanApplyView;
