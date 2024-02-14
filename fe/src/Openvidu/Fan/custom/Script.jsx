import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Script({ chatDisplay, close, scripts }) {
  return (
    <div
      className="font-jamsil text-white font-bold flex flex-col text-center border-l-2 border-dark-gary bg-black h-screen "
      style={{ display: chatDisplay }}
    >
      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="text-25 pt-3"> 스크립트 </p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon className="text-black rounded-full hover:scale-110 hover:bg-white" />
        </IconButton>
      </div>

      <div className="flex flex-col mt-5 w-[80%]  ml-[10%] m-2 p-2 whitespace-pre-line border-2 border-dark-gray rounded-full">
        {scripts
          ? scripts.map((messageData, index) => (
              <p key={index}>{messageData}</p>
            ))
          : '스크립트를 작성하지 않았어요'}
      </div>
    </div>
  );
}
