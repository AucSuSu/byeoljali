import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import '../../../Web/Utils/twinkle.css';

export default function Header({ title, member, timer }) {
  const minutes = Math.floor(timer / 60); // 남은 시간 관련 계산
  const seconds = timer % 60;

  return (
    <AppBar>
      <div className="bg-black fixed top-0 w-full p-4 flex justify-between items-center font-jamsil tracking-wide border-b-2 border-dark-gray text-white">
        <div className="flex items-center">
          <p className="border-r pr-4 text-25 font-bold">{title}</p>
          <p className="pl-4">{member}</p>
        </div>
        <p className={timer < 6 ? 'text-18 text-red blinking-text' : 'text-18'}>
          남은 시간 : {minutes > 9 ? minutes : `0${minutes}`}분{seconds}초
        </p>
      </div>
    </AppBar>
  );
}
