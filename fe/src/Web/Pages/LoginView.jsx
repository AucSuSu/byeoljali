import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Stores/authReducer.js';
import axios from 'axios';
import './LoginView.css';

export default function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const data = {
    username: email,
    password: password,
  };

  // Kakao Test

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

    console.log('코드 : ', code);
  }, []);

  const getData = async (code) => {
    try {
      // 백엔드로 인가 코드를 전송하여 데이터 요청
      const res = await axios.get(`http://localhost:8080/oauth`, {
        params: {
          code: code,
        },
      });
      console.log('로그인 성공', res); // 받은 데이터 출력
      console.log(res.headers['authorization']); // 이게 access-token
      console.log(res.headers['authorization-refresh']); // 이게 refresh-token
      console.log(code);
    } catch (error) {
      console.error('백엔드 전송 실패', error);
      console.log(code);
    }
  };

  const handleData = () => {
    getData(code);
  };

  const handleCode = () => {
    console.log(code);
  };

  const Rest_api_key = '218aa28a9e8fa4d947c106cb95b2ec1b'; // REST API KEY
  const redirect_uri = 'http://localhost:3000'; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}`;

  // Kakao Test

  const handleFanLogin = () => {
    console.log('카톡 로그인 클릭');
    window.location.href = kakaoURL;
    // navigate('/');
  };

  const handleArtistLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  return (
    <div className="content">
      <div>
        <h1>별자리에 오신 것을 환영합니다.</h1>
        <p>로그인하여 당신의 스타와 만나보세요</p>
      </div>

      <div className="login-section">
        <div>
          <h3>Fan 로그인</h3>
          <img src="/kakao.png" alt="Hi" onClick={handleFanLogin} />
          <button onClick={handleData}>데이터 수동 전송</button>
          <button onClick={handleCode}>코드 확인하기</button>
        </div>

        <div>
          <h3> 아티스트 로그인</h3>
          <form onSubmit={handleArtistLogin}>
            <div>
              <label>ID : </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label> 비밀번호 : </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}
