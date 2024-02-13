import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Script({ chatDisplay, close, scripts }) {
  return (
    <div
      className="font-milk text-white font-bold flex flex-col text-center border-l-2 border-dark-gary bg-black h-screen "
      style={{ display: chatDisplay }}
    >
      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="text-18 font-isa"> 스크립트 </p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon className="text-black rounded-full hover:scale-110 hover:bg-white" />
        </IconButton>
      </div>

      <div className="flex flex-col m-2 p-2 whitespace-pre-line">
        {scripts.map((messageData, index) => (
          <p key={index}>{messageData}</p>
        ))}
      </div>
    </div>
  );
}
