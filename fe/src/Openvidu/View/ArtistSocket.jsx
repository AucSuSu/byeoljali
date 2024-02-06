import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

export default function Socket({
  memberFansignId,
  closeNo,
  joinNo,
  GetFanData,
}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/socket');

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('아티스트가 메세지 전달받음 : ', message);
      if (message.type === 'date') {
        GetFanData(message.message);
        console.log('아티스트가 전달받은 fanData : ', message);
      }
    };

    newSocket.onopen = async () => {
      await enterMessage(newSocket);
      console.log('OPEN 들어왔어요~ : WebSocket connection opened');
    };

    newSocket.onclose = (event) => {
      console.log(' CLOSE 나갔어요... : WebSocket connection closed:', event);
    };

    setSocket(newSocket);
    // 컴포넌트 언마운트 시 소켓 연결 해제
    // return () => {
    //   newSocket.close();
    // };
  }, []);

  useEffect(() => {
    sendMessage('CLOSE', closeNo);
  }, [closeNo]);

  useEffect(() => {
    sendMessage('JOIN', joinNo);
  }, [joinNo]);

  // 메시지 전송 함수
  const sendMessage = (messageType, number) => {
    if (socket) {
      const myMessage = {
        type: messageType,
        roomId: `memberFansignSession${memberFansignId}`,
        message: number,
      };
      socket.send(JSON.stringify(myMessage));
    }
  };

  // 팬싸인 세션 입장하면 즉시 실행
  const enterMessage = (newSocket) => {
    const myMessage = {
      type: 'ENTER',
      roomId: `memberFansignSession${memberFansignId}`,
      message: 'Enter 완료',
    };
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
