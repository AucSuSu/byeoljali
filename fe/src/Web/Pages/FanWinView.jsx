import React from 'react';
import NavBar from '../Utils/NavBar';
import FanWin from '../Fan/FanWin';

function FanWinView() {
  return (
    <>
      <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat">
        <NavBar />
        <FanWin />
      </div>
    </>
  );
}

export default FanWinView;
