import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';

export default function Footer({ id, toggleChat }) {
  const [count, setCount] = useState(4);

  const capture = (id) => {
    if (count) {
      setCount(count - 1);
    } else {
      alert('다 찍었어용');
    }
    console.log('capture^^', id);
  };

  return (
    <>
      <div className="bg-pink fixed bottom-0 w-full h-15 font-milk text-black font-bold flex items-center justify-between p-4">
        <div>
          <p className="mx-2">남은 촬영 횟수 : {count}</p>
        </div>

        <IconButton onClick={() => capture(id)}>
          <PhotoCameraRoundedIcon />
        </IconButton>

        <IconButton onClick={() => toggleChat()}>
          <ChatIcon />
        </IconButton>
      </div>
    </>
  );
}
