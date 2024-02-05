import React from 'react';
import AppBar from '@material-ui/core/AppBar';

export default function Header({ title, member, timer }) {
  const minutes = Math.floor(timer / 60); // 남은 시간 관련 계산
  const seconds = timer % 60;

  return (
    <AppBar>
      <div className="bg-pink fixed top-0 w-full p-4 flex justify-between items-center font-milk text-black">
        <div className="flex items-center">
          <p className="border-r pr-4 text-18 font-bold">{title} 팬 싸인회</p>
          <p className="pl-4">{member}</p>
        </div>
        <p>
          남은 시간 : {minutes > 9 ? minutes : `0${minutes}`}분{seconds}초
        </p>
      </div>
    </AppBar>
  );
}
