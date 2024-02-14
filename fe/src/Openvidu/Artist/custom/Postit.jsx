import React, { useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Postit({ chatDisplay, close, fanData, testFanData }) {
  useEffect(()=>{
    console.log('props fanData 확인 : ', 'true 여부 : ', (true && fanData))
    console.log('props testFanData 확인 : ', testFanData,'true 여부 : ', (true && testFanData))
  }, [fanData])
  useEffect(()=>{
    console.log('props fanData 확인 : ', fanData, 'true 여부 : ', (true && fanData))
    console.log('props testFanData 확인 : ', testFanData, 'true 여부 : ', (true && testFanData))
  }, [testFanData])
  return (
    <div
      className="font-jamsil text-white font-bold flex flex-col text-center bg-black h-screen mt-3 "
      style={{ display: chatDisplay }}
    >
      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="text-25">팬 정보</p>
        <IconButton id="closeButton" onClick={() => close()}>
          <CloseIcon className="text-black rounded-full hover:scale-110 hover:bg-white" />
        </IconButton>
      </div>

      <div className="flex flex-col items-center justify-center h-[15%]">
        <p className="mb-2">닉네임 : {fanData ? fanData.nickname : ''}</p>
        <p>생일 : {fanData ? fanData.birthday : ''}</p>
      </div>

      <div className="flex items-center justify-center bg-hot-pink h-[10%]">
        <p className="text-25">포스트잇</p>
      </div>
      <div className="flex flex-col mt-5 w-[80%]  ml-[10%] m-2 p-2 whitespace-pre-line border-2 border-dark-gray rounded-full">
        {fanData
          ? fanData.postit.map((messageData, index) => (
              <p key={index}> {messageData}</p>
            ))
          : '전달받은 포스트잇이 없어요'}
      </div>
    </div>
  );
}
