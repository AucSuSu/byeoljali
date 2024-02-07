import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Script({ chatDisplay, close, scripts }) {
  return (
    <div
      className="font-milk font-bold flex flex-col text-center"
      style={{ display: chatDisplay }}
    >
      <div className="bg-lime-100 h-14">
        <p className="text-lime-100">숨겨놓기</p>
        <p className=""> 스크립트 </p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon color="secondary" />
        </IconButton>
      </div>

      <div className="flex flex-col items-center bg-lime-100 "></div>
      <div>
        {scripts.map((messageData, index) => (
          <p key={index}> {messageData}</p>
        ))}
      </div>
    </div>
  );
}
