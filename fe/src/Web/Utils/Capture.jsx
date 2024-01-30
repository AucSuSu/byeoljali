import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function Capture() {
  const captureRef = useRef(null);

  const handleCaptureClick = () => {
    html2canvas(captureRef.current).then((canvas) => {
      // canvas 객체를 사용하여 필요한 작업 수행
      // 예: 이미지로 저장, 미리보기 표시 등
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'capture.png';
      link.click();
    });
  };

  return (
    <div>
      <div ref={captureRef}>
        <h1>캡쳐 가보자고</h1>
        <img
          src="https://pbs.twimg.com/media/FZuGhtZaMAEMLdh.jpg"
          alt="치이카와"
        />
      </div>
      <button onClick={handleCaptureClick}>캡쳐하기</button>
    </div>
  );
}

export default Capture;
