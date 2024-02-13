import React from 'react';
import './twinkle.css'; // 스타일 파일을 아래에서 생성합니다.

const BlinkingText = () => {
  return (
    <img
      src="/image.png"
      className="blinking-text ps-1"
      style={{
        width: '50px',
        height: '50px',
      }}
    ></img>
  );
};

export default BlinkingText;
