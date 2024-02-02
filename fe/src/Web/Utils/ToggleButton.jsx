// ToggleButton.jsx
import React from 'react';
import './ToggleButton.css'; // 스타일 파일 임포트

const ToggleButton = ({ isApplying, toggleApply }) => {
  return (
    <div className="toggle-container" onClick={toggleApply}>
      <div className={`slider ${isApplying ? 'toggled' : ''}`}>
        {isApplying ? '응모 중' : '응모 전'}
      </div>
    </div>
  );
};

export default ToggleButton;
