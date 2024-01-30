import React from 'react';
import NavBar from '../Utils/NavBar';
import FanWin from '../Fan/FanWin';

function FanWinView() {
  return (
    <>
      <NavBar isFan={true} />
      <FanWin />
    </>
  );
}

export default FanWinView;
