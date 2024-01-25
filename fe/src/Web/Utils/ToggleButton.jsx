import React, { useState } from 'react';
import styled from 'styled-components';

// 토글 스위치 컨테이너
const ToggleSwitch = styled.div`
  width: 60px;
  height: 30px;
  background: ${(props) => (props.isToggled ? '#4caf50' : '#ccc')};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
`;

// 토글 핸들
const ToggleHandle = styled.div.attrs((props) => ({
  style: {
    left: props.isToggled ? '31px' : '1px',
  },
}))`
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  transition: left 0.3s;
`;

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <ToggleSwitch
      isToggled={isToggled}
      onClick={() => setIsToggled(!isToggled)}
    >
      <ToggleHandle isToggled={isToggled} />
    </ToggleSwitch>
  );
};

export default ToggleButton;
