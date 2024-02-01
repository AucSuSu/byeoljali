import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

export default function Socket({ memberFansignId }) {
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // WebSocket 서버에 연결
    const newSocket = new SockJs('https://i10e104.p.ssafy.io/api/socket');

    // 메시지 수신 처리
    // 누가 여기 세션으로 보내면 자동으로 실행되는 핸들러
    newSocket.onmessage = (e) => {
      // 수신된 메시지 처리
      const message = JSON.parse(e.data);
      console.log('recieved message ', message);
      // 읽어온 메세지
      setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    setSocket(newSocket);
    enterMessage();
    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.close();
    };
  }, []); // 빈 배열은 한 번만 실행하도록 함

  // 메시지 전송 함수
  const sendMessage = () => {
    if (socket) {
      const myMessage = {
        type: 'TALK',
        roomId: `memberFansignSession${memberFansignId}`,
        sender: 'chee',
        // 필요하다면 사용하는 식별자
        msg: inputMessage,
        // 메세지
      };

      // 서버로 메시지 전송
      socket.send(JSON.stringify(myMessage));
      console.log('전송');
      setInputMessage(''); // 입력 필드 초기화
    }
  };

  // 원래는 해당 페이지 들어가자마자 실행되어야 함 ㅜㅜ
  // 팬기준은 대기방 들어가자마자
  // 아티스트 기준은 팬싸방 들어가자마자
  const enterMessage = () => {
    if (socket) {
      const myMessage = {
        type: 'ENTER',
        roomId: `memberFansignSession${memberFansignId}`,
        sender: 'chee',
        // 필요하다면 사용하는 식별자
        msg: inputMessage,
        // 메세지
      };

      // 서버로 메시지 전송
      socket.send(JSON.stringify(myMessage));
      console.log('입장');
      setInputMessage(''); // 입력 필드 초기화
    }
  };

  return (
    <div>
      <h2>채팅 애플리케이션</h2>
      <div
        style={{
          height: '200px',
          border: '1px solid #ccc',
          overflowY: 'scroll',
        }}
      >
        {chatMessages.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>전송</button>
      <button onClick={enterMessage}>입장</button>
    </div>
  );
}
