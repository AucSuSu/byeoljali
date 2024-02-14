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
      console.log(
        '아티스트 메세지 확인 -> message.type : ',
        message.type,
        'message.message.nickname : ',
        message.message.nickname,
        'ture & false 여부 : ',
        message.type === 'TALK',
        message.message.nickname !== 'Artist',
      );
      if (message.type === 'TALK' && message.message.nickname !== 'Artist') {
        console.log('Artist가 getFanData 실행됬어요.');
        getFanData(message.message);
      } else if (
        message.type === 'ENTER' &&
        message.message.nickname !== 'Artist'
      ) {
        console.log('Artist가 SendMessage 실행했어요');
        sendMessage('TALK');
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
      message: { orders: null, postit: null, birthday: null, nickname: null },
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
