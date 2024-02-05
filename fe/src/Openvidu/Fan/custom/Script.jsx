import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Script({ chatDisplay, close, script }) {
  return (
    <div className="font-milk font-bold " style={{ display: chatDisplay }}>
      <div className="bg-gray-300 top-0 left-0 right-0 bottom-0 z-50 mx-auto h-full w-full rounded-2xl">
        <div className="bg-lime-100">
          <p>스크립트</p>
          <IconButton id="closeButton" onClick={() => close()}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <div className="w-full h-full bg-white">
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
          <p>TEST MESSAGE : script{script}</p>
        </div>
      </div>
    </div>
  );
}
