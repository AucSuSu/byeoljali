import React from 'react';

export default function Header({ title, member, timer }) {
  const minutes = Math.floor(timer / 60); // 남은 시간 관련 계산
  const seconds = timer % 60;

  return (
    <div className="bg-pink w-full p-4 flex justify-between items-center text-black border-b-2">
      <div className="flex items-center">
        <p className="border-r pr-4 text-18">{title} 팬 싸인회</p>
        <p className="pl-4">{member}</p>
      </div>
      <p>
        남은 시간 : {minutes > 9 ? minutes : `0${minutes}`}분{seconds}초
      </p>
    </div>
  );
}
