import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

export default function ArtistSocket({
  memberFansignId,
  autoData,
  getFanData,
}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/socket');

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('아티스트가 메세지 전달받음 : ', message);
      if (message.type === 'TALK') {
        getFanData(message.message);
      } else if (
        message.type === 'ENTER' &&
        message.message.nickname !== 'Artist'
      ) {
        sendMessage('ENTER');
      }
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
      console.log('OPEN Artist 들어왔어요~');
    };

    newSocket.onclose = (event) => {
      console.log('CLOSE Artist 나갔어요~', event);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
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
          fanId : null
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
      message: { orders: null, postit: null, birthday: null, nickname: null },
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
