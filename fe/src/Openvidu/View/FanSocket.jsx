import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function FanSocket({
  propsData,
  stationData,
  joinSignal,
  updateCurUser,
}) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (stationData) {
      sendMessage('TALK', {
        orders: null,
        postit: stationData.postit,
        birthday: stationData.birthday,
        nickname: stationData.nickname,
        fanId: propsData.fanId,
      });
    }
  }, [stationData]);

  useEffect(() => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/socket');

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('팬이 전달받은 메세지 : ', message);
      if (
        message.type === 'JOIN' &&
        message.message.orders === propsData.orders
      ) {
        joinSignal();
      } else if (
        message.type === 'CLOSE' &&
        message.message.orders === propsData.orders
      ) {
        Swal.fire({
          icon: 'warning',
          title: '팬싸인회가 종료되었습니다.',
          text: '내 앨범 페이지로 이동합니다',
          background: '#222222',
          confirmButtonColor: '#FF2990',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/fan-photo');
          }
        });
        // 2초 후에 확인 버튼을 자동으로 누르기
        setTimeout(() => {
          Swal.close();
          navigate('/fan-photo');
        }, 1000);
      } else if (
        message.type === 'TALK' &&
        message.message.nickname === 'Artist'
      ) {
        updateCurUser(message.orders);
      }
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
      console.log('OPEN Fan 들어왔어요~');
    };

    newSocket.onclose = (event) => {
      console.log(' CLOSE Fan 나갔어요~', event);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setSocket(newSocket);
    // 컴포넌트 언마운트 시 소켓 연결 해제
    // return () => {
    //   newSocket.close();
    // };
  }, []);

  // 메시지 전송 함수
  const sendMessage = (messageType, msg) => {
    if (socket) {
      const myMessage = {
        type: messageType,
        roomId: `memberFansignSession${propsData.memberFansignId}`,
        message: msg,
      };
      socket.send(JSON.stringify(myMessage));
    }
  };

  // 팬싸인 세션 입장하면 즉시 실행
  const enterMessage = (newSocket) => {
    const myMessage = {
      type: 'ENTER',
      roomId: `memberFansignSession${propsData.memberFansignId}`,
      message: {
        orders: null,
        postit: null,
        birthday: null,
        nickname: null,
        fanId: null,
      },
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
