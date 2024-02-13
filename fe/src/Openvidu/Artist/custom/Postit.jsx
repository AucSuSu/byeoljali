import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Postit({ chatDisplay, close, fanData }) {
  return (
    <div
      className="font-milk text-white font-bold flex flex-col text-center bg-black h-screen "
      style={{ display: chatDisplay }}
    >
      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="tex-25">팬 정보</p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon className="text-black rounded-full hover:scale-110 hover:bg-white" />
        </IconButton>
      </div>

      <div className="flex flex-col items-center justify-center h-[15%]">
        <p>닉네임 : {fanData ? fanData.nickname : '없지롱'}</p>
        <p>생일 : {fanData ? fanData.birthday : '모르지롱'}</p>
      </div>

      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="tex-25">포스트잇</p>
      </div>
      <div className="flex flex-col m-2 p-2 whitespace-pre-line">
        {fanData
          ? fanData.postit.map((messageData, index) => (
              <p key={index}> {messageData}</p>
            ))
          : null}
      </div>
    </div>
  );
}
