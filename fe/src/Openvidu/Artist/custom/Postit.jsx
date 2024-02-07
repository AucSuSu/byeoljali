import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Postit({ chatDisplay, close, fanData }) {
  return (
    <div
      className="font-milk font-bold flex flex-col text-center"
      style={{ display: chatDisplay }}
    >
      <div className="bg-lime-100 h-14">
        <p className="text-lime-100">숨겨놓기</p>
        <p className="">팬 정보</p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon color="secondary" />
        </IconButton>
      </div>

      <div className="">
        <p className="text-white">숨겨놓기</p>
        <p>닉네임 : {fanData ? fanData.nickname : '없지롱'}</p>
        <p>생일 : {fanData ? fanData.birthday : '모르지롱'}</p>
        <p className="text-white">숨겨놓기</p>
      </div>

      <div className="flex flex-col items-center bg-lime-100 ">
        <div className="bg-lime-100 text-center h-11 flex items-center justify-center">
          포스트잇
        </div>
      </div>
      <div>
        {fanData
          ? fanData.postit.map((messageData, index) => (
              <p key={index}> {messageData}</p>
            ))
          : null}
      </div>
    </div>
  );
}
