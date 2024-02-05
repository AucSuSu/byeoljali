import React, { useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const Chat = ({ messages, handleSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const mywait = 1;

  return (
    <div id="chat" className="flex flex-col h-full border-2">
      <h2 className="bg-lime-100 border-b-2 p-2 w-full text-center">Chat</h2>
      <div id="message-list" className="mb-4 h-screenoverflow-auto p-2">
        {messages.map((messageData, index) => (
          <div
            key={index}
            className={`mb-2 ${
              messageData.wait === mywait
                ? 'text-blue-500 text-right'
                : 'text-red-500 text-left'
            }`}
          >
            {messageData.text}
          </div>
        ))}
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
