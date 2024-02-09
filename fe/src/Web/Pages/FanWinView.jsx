import React from 'react';
import NavBar from '../Utils/NavBar';
import FanWin from '../Fan/FanWin';

function FanWinView() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <NavBar />
        <FanWin />
      </div>
    </>
  );
}

export default FanWinView;
