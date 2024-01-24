import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Kakao() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    // 페이지 로딩 시 인가 코드 추출
    const extractedCode = new URL(window.location.href).searchParams.get(
      'code',
    );
    setCode(extractedCode);

    // 코드가 있을 경우 자동으로 데이터 요청
    if (extractedCode) {
      getData(extractedCode);
    }

    console.log(code);
  }, []); // code

  const getData = async (code) => {
    try {
      // 백엔드로 인가 코드를 전송하여 데이터 요청
      const res = await axios.post('http://localhost:5000/auth', {
        code: code,
      });
      console.log(res.data); // 받은 데이터 출력
      console.log(code);
    } catch (error) {
      console.error('백엔드 전송 실패', error);
      console.log(code);
    }
  };

  // 추후 .env에 숨겨야함.
  const Rest_api_key = 'aa942ad78b7dca415ad4c16b40ef95d2'; // REST API KEY
  const redirect_uri = 'http://localhost:3000'; // Redirect URI
  // OAuth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleData = () => {
    if (code) {
      getData(code);
    } else {
      console.warn('유효하지 않은 코드.');
    }
  };

  const handleCode = () => {
    console.log(code);
  };

  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
      <button onClick={handleData}>데이터 수동 전송</button>
      <button onClick={handleCode}>코드 확인하기</button>
    </>
  );
}
