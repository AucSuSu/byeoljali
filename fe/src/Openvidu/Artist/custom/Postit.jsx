import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Postit({ chatDisplay, close, fanData }) {
  return (
    <div className="font-milk font-bold " style={{ display: chatDisplay }}>
      <div className="bg-gray-300 top-0 left-0 right-0 bottom-0 z-50 mx-auto h-full w-full rounded-2xl">
        <div className="bg-lime-100">
          <p>포스트잇</p>
          <IconButton id="closeButton" onClick={() => close()}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <div className="w-full h-full bg-lime-400">
          <p>닉네임 : {fanData ? fanData.nickname : '없지롱'}</p>
          <p>생일 : {fanData ? fanData.birthday : '모르지롱'}</p>
        </div>
        <div className="w-full h-full bg-white">
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
          <p>TEST MESSAGE : postit{fanData ? fanData.postit : 'ㅎㅎ'}</p>
        </div>
      </div>
    </div>
  );
}
