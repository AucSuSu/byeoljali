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
      <div className="bg-pink fixed bottom-0 w-full h-15 font-milk text-white font-bold flex justify-center ">
        <div className="flex justify-center mt-2 mb-2">
          <div
            onClick={() => blackList()}
            className="flex items-center mx-2 bg-slate-400 rounded-md"
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <p className="mx-2">블랙리스트</p>
          </div>

          <div
            className="flex items-center mx-2 bg-slate-400 rounded-md"
            onClick={() => timeOver(orders, false)}
          >
            <IconButton>
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
      </div>
    </>
  );
}
