import React from 'react';
import NavBar from '../Utils/NavBar';
import FanListApply from '../Fan/FanApply';

function FanApplyView() {
  return (
    <>
      <NavBar isFan={true} />
      <FanListApply />
    </>
  );
}

export default FanApplyView;
