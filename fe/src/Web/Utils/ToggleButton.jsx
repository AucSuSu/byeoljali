// ToggleButton.jsx
import React from 'react';
import './ToggleButton.css'; // 스타일 파일 임포트

const ToggleButton = ({ type, isApplying, toggleApply }) => {
  return (
    <div className="toggle-container" onClick={toggleApply}>
      <div className={`slider ${isApplying ? 'toggled' : ''}`}>
        {isApplying
          ? type
            ? '팬싸 중'
            : '응모 중'
          : type
            ? '팬싸 전'
            : '응모 전'}
      </div>
    </div>
  );
};

export default ToggleButton;
