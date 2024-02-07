import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Note({ handlePostit, handleScript }) {
  const [postit, setPostit] = useState('포스트잇을 입력해주세요');
  const [script, setScript] = useState('스크립트를 입력해주세요');
  const [typingPostits, setTypingPostits] = useState([]);
  const [typingScripts, setTypingScripts] = useState([]);

  useEffect(() => {
    handlePostit(typingPostits);
  }, [typingPostits]);

  useEffect(() => {
    handleScript(typingScripts);
  }, [typingScripts]);

  const inputPostit = () => {
    setTypingPostits((prev) => prev.concat(postit));
    setPostit([]);
  };

  const inputScript = () => {
    setTypingScripts((prev) => prev.concat(script));
    setScript([]);
  };

  const deletePostit = (index) => {
    setTypingPostits((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteScript = (index) => {
    setTypingScripts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full h-full mb-4 ">
        <label className="bg-lime-100 border-2 p-2 w-full text-center">
          포스트잇
        </label>
        <div className="border-l-2 border-r-2 w-full h-full p-2 text-center">
          {typingPostits.map((typingPostit, index) => (
            <div key={index}>
              <p>{typingPostit}</p>
              <button onClick={() => deletePostit(index)}>X</button>
            </div>
          ))}
        </div>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={postit}
            onChange={(e) => {
              setPostit(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputPostit();
              }
            }}
            className="flex-grow p-2 text-center"
          />
          <button className="border-l-2 p-2 bg-lime-100" onClick={inputPostit}>
            <PlayArrowIcon />
          </button>
        </div>
      </div>

      {/* 공간 띄워줘 */}

      <div className="flex flex-col items-center w-full h-full ">
        <label className="bg-pink border-2 p-2 w-full text-center">
          스크립트
        </label>
        <div className="border-l-2 border-r-2 w-full h-full p-2 text-center">
          {typingScripts.map((typingScript, index) => (
            <div key={index}>
              <p>{typingScript}</p>
              <button onClick={() => deleteScript(index)}>X</button>
            </div>
          ))}
        </div>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputScript();
              }
            }}
            className="flex-grow p-2 text-center"
          />
          <button className="border-l-2 p-2 bg-pink" onClick={inputScript}>
            <PlayArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
