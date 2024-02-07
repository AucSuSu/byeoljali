import React, { useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Note({ script, postit, handlePostit, handleScript }) {
  const [testPostits, setTestPostits] = useState(null);
  const [testScripts, setTestScripts] = useState(null);
  const [typingPostit, setTypingPostit] = useState([]);
  const [typingScript, setTypingScript] = useState([]);

  const inputPostit = () => {
    setTypingPostit((prev) => prev.concat(testPostits));
    setTestPostits([]);
  };

  const inputScript = () => {
    setTypingScript((prev) => prev.concat(testScripts));
    setTestScripts([]);
  };

  const deletePostit = (index) => {
    setTestPostits((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteScript = (index) => {
    setTypingScript((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full h-full mb-4 ">
        <label className="bg-lime-100 border-2 p-2 w-full text-center">
          포스트잇
        </label>
        <div className="border-l-2 border-r-2 w-full h-full p-2 text-center">
          {postit}
          {/* {typingPostit.map((testPostit, index) => (
            <div key={index}>
              <p>{testPostit}</p>
              <button onClick={() => deletePostit(index)}>X</button>
            </div>
          ))} */}
        </div>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={postit}
            onChange={(e) => {
              handlePostit(e.target.value);
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
          {script}
          {/* {typingScript.map((testScript, index) => (
            <div key={index}>
              <p>{testScript}</p>
              <button onClick={() => deleteScript(index)}>X</button>
            </div>
          ))} */}
        </div>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={script}
            onChange={(e) => handleScript(e.target.value)}
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
