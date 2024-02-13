import React, { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Note({ handlePostit, handleScript }) {
  const [postit, setPostit] = useState(null);
  const [script, setScript] = useState(null);
  const [typingPostits, setTypingPostits] = useState([]);
  const [typingScripts, setTypingScripts] = useState([]);

  const postitRef = useRef();
  const scriptRef = useRef();

  useEffect(() => {
    postitRef.current.scrollTop = postitRef.current.scrollHeight;
  }, [typingPostits]);

  useEffect(() => {
    scriptRef.current.scrollTop = scriptRef.current.scrollHeight;
  }, [typingScripts]);

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
      <div className="flex flex-col items-center w-full h-[50%] mb-4 ">
        <label className="bg-hot-pink border-2 border-dark-gray p-2 w-full text-center">
          포스트잇
        </label>
        <div
          className="border-l-2 border-r-2 border-dark-gray w-[100%] h-full p-2 text-center overflow-y-auto whitespace-pre-line"
          ref={postitRef}
        >
          {typingPostits.map((typingPostit, index) => (
            <div
              key={index}
              className="flex bg justify-between items-start mb-2"
            >
              <p className="border-2 border-dark-gray w-full rounded-lg px-4">
                {typingPostit}
              </p>
              <button
                onClick={() => deletePostit(index)}
                className="text-white ml-4 hover:scale-110 hover:text-hot-pink"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="border-2 border-dark-gray  w-full flex mt-auto">
          <input
            type="text"
            value={postit}
            placeholder="포스트잇을 작성해주세요"
            onChange={(e) => {
              setPostit(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputPostit();
              }
            }}
            className="flex-grow p-2 text-center bg-black"
          />
          <button
            className="border-l-2 border-dark-gray p-2 bg-hot-pink hover:opacity-80"
            onClick={inputPostit}
          >
            <PlayArrowIcon />
          </button>
        </div>
      </div>

      {/* 공간 띄워줘 */}

      <div className="flex flex-col items-center w-full h-[50%] ">
        <label className="bg-dark-gray border-2 border-dark-gray p-2 w-full text-center">
          스크립트
        </label>
        <div
          className="border-l-2 border-r-2 border-dark-gray w-[100%] h-full p-2 text-center overflow-y-auto whitespace-pre-line"
          ref={scriptRef}
        >
          {typingScripts.map((typingScript, index) => (
            <div
              key={index}
              className="flex bg justify-between items-start mb-2"
            >
              <p className="border-2 border-dark-gray w-full rounded-lg px-4">
                {typingScript}
              </p>
              <button
                onClick={() => deleteScript(index)}
                className="text-white hover:scale-110 hover:text-hot-pink ml-4"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="border-2 border-dark-gray  w-full flex mt-auto">
          <input
            type="text"
            value={script}
            placeholder="스크립트를 작성해주세요"
            onChange={(e) => setScript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputScript();
              }
            }}
            className="flex-grow p-2 text-center bg-black"
          />
          <button
            className="border-l-2 p-2 bg-gray hover:opacity-80"
            onClick={inputScript}
          >
            <PlayArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
