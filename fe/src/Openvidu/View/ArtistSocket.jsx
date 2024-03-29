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

      if (message.type === 'TALK' && message.message.nickname !== 'Artist') {
        getFanData(message.message);
      } else if (
        message.type === 'ENTER' &&
        message.message.nickname !== 'Artist'
      ) {
        sendMessage('TALK', newSocket);
      }
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
    };

    newSocket.onclose = async (event) => {
      await enterMessage(newSocket);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setSocket(newSocket);

    return () => {
      sendMessage('QUIT', newSocket);
    };
  };

  useEffect(() => {
    initSocket();

    return () => {
      initSocket();
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
  const sendMessage = (messageType, newSocket) => {
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
    if (socket) {
      socket.send(JSON.stringify(myMessage));
    } else if (newSocket) {
      newSocket.send(JSON.stringify(myMessage));
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
