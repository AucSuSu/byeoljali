// FormComponent.jsx
import React, { useState } from 'react';

const FormComponent = () => {
  // 폼의 상태를 관리하기 위한 state 변수 설정
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // input 변경 시 호출되는 이벤트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 폼 데이터 업데이트
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 시 호출되는 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터 활용 또는 전송
    console.log('제출된 데이터:', formData);
    // 여기서 서버로 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        사용자명:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
};

export default FormComponent;
