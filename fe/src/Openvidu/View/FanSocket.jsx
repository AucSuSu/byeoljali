import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';
import { useNavigate } from 'react-router-dom';

export default function FanSocket({ propsData, stationData, joinSignal }) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (stationData) {
      sendMessage('TALK', {
        orders: null,
        postit: stationData.postit,
        birthday: stationData.birthday,
        nickname: stationData.nickname,
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
        navigate('/home');
      } else if(
        message.type ==='ENTER' && message.nickname ==='Artist'
      ){}
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
      console.log('OPEN Fan 들어왔어요~');
    };

    newSocket.onclose = (event) => {
      console.log(' CLOSE Fan 나갔어요~', event);
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
      message: { orders: null, postit: null, birthday: null, nickname: null },
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
