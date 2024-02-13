import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';

export default function Header({ title, member, timer, remainingTime }) {
  const minutes = Math.floor(timer / 60); // 남은 시간 관련 계산
  const seconds = timer % 60;

  return (
    <AppBar>
      <div className="bg-black fixed top-0 w-full p-4 flex justify-between items-center font-big tracking-wide border-b-2 border-dark-gray text-white">
        <div className="flex items-center">
          <p className="border-r pr-4 text-18 font-bold">{title} 팬 싸인회</p>
          <p className="pl-4">{member}</p>
        </div>
        {remainingTime === 0 ? (
          <p>
            남은 시간 : {minutes > 9 ? minutes : `0${minutes}`}분{seconds}초
          </p>
        ) : (
          <p> 시작까지 남은 시간 : {remainingTime}초</p>
        )}
      </div>
    </AppBar>
  );
}
