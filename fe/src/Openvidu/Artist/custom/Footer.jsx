import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export default function Footer({ id, timeOver, orders, toggleChat, addCount, removeCount }) {
  const blakcList = (id) => {
    console.log('blackList^^', id);
  };

  const shutDown = (id) => {
    console.log('shutDown^^', id);
  };

  return (
    <>
      <div className="bg-pink fixed bottom-0 w-full h-15 font-milk text-white font-bold flex justify-center ">
        <div className="flex justify-center mt-2 mb-2">
          <div className="flex items-center mx-2 bg-slate-400 rounded-md">
            <IconButton onClick={() => blakcList(id)}>
              <AddIcon />
            </IconButton>
            <p className="mx-2">블랙리스트</p>
          </div>

          <div className="flex items-center mx-2 bg-slate-400 rounded-md" onClick={()=> timeOver(orders)}>
            <IconButton onClick={() => shutDown(id)}>
              <CloseIcon />
            </IconButton>
            <p className="mx-2">강제종료</p>
          </div>
        </div>

        <div>
          <IconButton onClick={() => toggleChat()}>
            <ChatIcon />
          </IconButton>
        </div>
        <div>
          <p onClick={() => addCount()}>addCount</p>
          <p onClick={() => removeCount()}>removeCount </p>
        </div>
      </div>
    </>
  );
}
