import React, { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const Chat = ({ messages, handleSendMessage, orders }) => {
  // 스크롤 위치 고정
  const scrollRef = useRef();

  useEffect(() => {
    // .current === 참조된 DOM Element
    // .scrollTop === 현재 스크롤 위치, .scrollHeight === 스크롤 길이
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

  const [inputMessage, setInputMessage] = useState('');

  return (
    <div id="chat" className="flex flex-col h-full border-2">
      <h2 className="bg-lime-100 border-b-2 p-2 w-full text-center">Chat</h2>
      <div ref={scrollRef} className="mb-4 h-screen overflow-y-auto p-2">
        {messages.map((messageData, index) =>
          messageData.orders === orders ? (
            <div key={index} className="font-milk flex flex-col">
              <div className="flex justify-end">
                <p className="font-bold text-base">{messageData.nickname}</p>
                <div className="text-center inline-block">
                  <img
                    src={messageData.profileImage}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover mx-1"
                  />
                </div>
              </div>
              <p className="bg-pink text-right text-sm w-[70%] ml-auto pr-3 ">
                {messageData.text}
              </p>
            </div>
          ) : (
            <div key={index} className="font-milk flex flex-col text-left">
              <div className="flex">
                <div className="text-center inline-block">
                  <img
                    src={messageData.profileImage}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
                <p className="font-bold">{messageData.nickname}</p>
              </div>
              <p className="bg-lime-100 text-sm w-[70%] pl -3">
                {messageData.text}
              </p>
            </div>
          ),
        )}
      </div>
      <div className="flex mt-auto items-center border-t-2">
        <input
          type="text"
          placeholder="Enter a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(inputMessage);
              setInputMessage('');
            }
          }}
          className="p-2 w-full"
        />
        <button
          className="p-2 bg-lime-100"
          onClick={() => handleSendMessage(inputMessage)}
        >
          <PlayArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
