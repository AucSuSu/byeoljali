import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

export default function Socket({
  memberFansignId,
  waitNo,
  joinNo,
  GetFanData,
}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/socket');
    console.log(` roomId에용 : memberFansignSession${memberFansignId}`);

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.type === 'date') {
        GetFanData(message.msg);
        console.log('fanData 테스트 : ', message);
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
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    sendMessage('close', waitNo);
  }, [waitNo]);

  useEffect(() => {
    sendMessage('join', joinNo);
  }, [joinNo]);

  // 메시지 전송 함수
  const sendMessage = (messageType, number) => {
    if (socket) {
      const myMessage = {
        type: messageType,
        roomId: `memberFansignSession${memberFansignId}`,
        sender: `Send`,
        // 필요하다면 사용하는 식별자
        msg: number,
        // 메세지
      };

      // 서버로 메시지 전송
      socket.send(JSON.stringify(myMessage));
      console.log('전송');
    } else {
      console.log('아직 소켓이 없어용');
    }
  };
  // 팬싸인 세션 입장하면 즉시 실행
  const enterMessage = (newSocket) => {
    const myMessage = {
      type: 'ENTER',
      roomId: `memberFansignSession${memberFansignId}`,
      sender: `Enter`, // 필요하다면 사용하는 식별자
      msg: 'Enter 완료',
    };

    // 서버로 메시지 전송
    newSocket.send(JSON.stringify(myMessage));
  };

  return <></>;
}
