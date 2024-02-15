import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import useAxios from '../../../Web/axios.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Footer({ fanData, timeOver, orders, toggleChat }) {
  const customAxios = useAxios();
  const navigate = useNavigate();
  const blackList = () => {
    customAxios
      .post(`blacklist/${fanData.fanId}`)
      .then((res) => {
        console.log('블랙리스트 성공 : ', res);
      })
      .catch((err) => console.log('블랙리스트 실패 : ', err));
    return response;
  };

  const finishFansign = () => {
    Swal.fire({
      icon: 'warning',
      title: '팬싸인회가 모두 종료되었습니다',
      text: '수고하셨습니다',
      background: '#222222',
      confirmButtonColor: '#FF2990',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/artist-profile');
      }
    });
  };

  return (
    <>
      <div className="flex fixed bg-black bottom-0 w-full h-15 font-jamsil text-white font-bold justify-between p-4 border-t-2 border-dark-gray">
        {/* 좌측 끝 */}
        <div
          className="flex items-center bg-dark-gray rounded-md font-jamsil px-4 ml-5 cursor-pointer"
          onClick={() => finishFansign()}
        >
          팬 싸인회 종료
        </div>
        {/* 중앙 */}
        <div className="flex">
          <div
            onClick={() => {blackList()
              timeOver(orders, false)
            }}
            className="flex items-center bg-dark-gray  rounded-md mr-5"
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <p className="pr-4 font-jamsil">블랙리스트</p>
          </div>

          <div
            className="flex items-center bg-dark-gray rounded-md ml-5"
            onClick={() => timeOver(orders, false)}
          >
            <IconButton>
              <CloseIcon />
            </IconButton>
            <p className="pr-4 font-jamsil">강제 종료</p>
          </div>
        </div>
        {/* 우측 끝 */}
        <div className="mr-5">
          <IconButton onClick={() => toggleChat()}>
            <ChatIcon className="text-hot-pink rounded-full hover:bg-white hover:scale-[130%]" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
