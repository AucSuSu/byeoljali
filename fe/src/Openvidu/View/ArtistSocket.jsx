import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

export default function ArtistSocket({
  memberFansignId,
  autoData,
  getFanData,
}) {
  const [socket, setSocket] = useState(null);

  const initSocket = () => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/socket');

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('아티스트가 메세지 전달받음 : ', message);

      if (message.type === 'TALK' && message.message.nickname !== 'Artist') {
        getFanData(message.message);
      } else if (
        message.type === 'ENTER' &&
        message.message.nickname !== 'Artist'
      ) {
        console.log('Artist가 SendMessage 실행했어요', '소켓이에용 : ', socket);
        sendMessage('TALK');
        console.log('TALk 왜 안보냄? 나 진짜 어이가 없어서 그래 설명좀 해줘');
      }
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
      console.log('OPEN Artist 들어왔어요~');
    };

    newSocket.onclose = (event) => {
      enterMessage(newSocket);
      console.log('CLOSE Artist 나갔어요~', event);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setSocket(newSocket);

    return async () => {
      await sendMessage('QUIT');
      newSocket.close();
      initSocket();
    };
  };

  useEffect(() => {
    initSocket();

    return async () => {
      if (socket) {
        await socket.close();
        initSocket();
      }
    };
  }, []);

  useEffect(() => {
    if (autoData.state) {
      sendMessage('JOIN');
    } else {
      sendMessage('CLOSE');
    }
  }, [autoData]);

  // 메시지 전송 함수
  const sendMessage = (messageType) => {
    if (socket) {
      const myMessage = {
        type: messageType,
        roomId: `memberFansignSession${memberFansignId}`,
        message: {
          orders: autoData.orders,
          postit: null,
          birthday: null,
          nickname: 'Artist',
          fanId: null,
        },
      };
      socket.send(JSON.stringify(myMessage));
    }
  };

  // 팬싸인 세션 입장하면 즉시 실행
  const enterMessage = (newSocket) => {
    const myMessage = {
      type: 'ENTER',
      roomId: `memberFansignSession${memberFansignId}`,
      message: { orders: 0, postit: null, birthday: null, nickname: 'Artist' },
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
