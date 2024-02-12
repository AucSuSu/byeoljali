import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import useAxios from '../../../Web/axios.js';

export default function Footer({ fanData, timeOver, orders, toggleChat }) {
  const customAxios = useAxios();
  const blackList = () => {
    customAxios
      .post(`blacklist/${fanData.fanId}`)
      .then((res) => {
        console.log('블랙리스트 성공 : ', res);
      })
      .catch((err) => console.log('블랙리스트 실패 : ', err));
    return response;
  };

  return (
    <>
      <div className="flex fixed bg-black bottom-0 w-full h-15 font-milk text-white font-bold justify-center p-4 border-t-2">
        <div
          onClick={() => blackList()}
          className="flex items-center bg-slate-400 rounded-md mr-5"
        >
          <IconButton>
            <AddIcon />
          </IconButton>
          <p className="pr-4">블랙리스트</p>
        </div>

        <div
          className="flex items-center bg-slate-400 rounded-md ml-5"
          onClick={() => timeOver(orders, false)}
        >
          <IconButton>
            <CloseIcon />
          </IconButton>
          <p className="pr-4">강제 종료</p>
        </div>

        <div className="absolute right-[10px]">
          <IconButton onClick={() => toggleChat()}>
            <ChatIcon className="text-hot-pink rounded-full hover:bg-white hover:scale-[130%]" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
