import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Note({ script, postit, handlePostit, handleScript }) {
  const getPostit = () => {
    console.log('postit');
  };
  const getScript = () => {
    console.log('script');
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full h-full mb-4 ">
        <label className="bg-lime-100 border-2 p-2 w-full text-center">
          포스트잇
        </label>
        <d className="border-l-2 border-r-2 w-full h-full p-2 text-center">
          {postit}
        </d>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={postit}
            onChange={(e) => {
              handlePostit(e.target.value);
            }}
            className="flex-grow p-2 text-center"
          />
          <button className="border-l-2 p-2 bg-lime-100" onClick={getPostit}>
            <PlayArrowIcon />
          </button>
        </div>
      </div>

      {/* 공간 띄워줘 */}

      <div className="flex flex-col items-center w-full h-full ">
        <label className="bg-pink border-2 p-2 w-full text-center">
          스크립트
        </label>
        <d className="border-l-2 border-r-2 w-full h-full p-2 text-center">
          {script}
        </d>
        <div className="border-2  w-full flex mt-auto">
          <input
            type="text"
            value={script}
            onChange={(e) => handleScript(e.target.value)}
            className="flex-grow p-2 text-center"
          />
          <button className="border-l-2 p-2 bg-pink" onClick={getScript}>
            <PlayArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
