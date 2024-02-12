// Loading.jsx
// 해당 컴포넌트는 로딩페이지 입니다.
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        {/* 여기에 로딩 스피너나 이미지 등을 넣습니다. */}
      </div>
      <p>로딩중입니다.</p> {/* 필요에 따라 로딩 메시지 추가 */}
    </div>
  );
};

export default Loading;
