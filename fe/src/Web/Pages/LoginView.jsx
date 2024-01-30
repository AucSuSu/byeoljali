import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../Stores/authReducer.js';
import { setToken } from '../Stores/authReducer.js';
import axios from 'axios';
import './LoginView.css';

export default function LoginView() {
  const token = useSelector((state) => state.auth.token);
  const isArtist = useSelector((state) => state.auth.isArtist);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const data = { email: email, password: password };

  useEffect(() => {
    if (token) {
      if (isArtist) {
        console.log('아티스트 로그인');
        navigate('/artistInfo');
      } else {
        console.log('팬 소셜 로그인');
        navigate('/home');
      }
    }
  }, [token]);

  // Kakao Test

  const [code, setCode] = useState(null);

  useEffect(() => {
    // 별
    for (let i = 0; i < 15; i++) {
      const newStar = new star();
      newStar.set();
    }


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
      const res = await axios.get(`${BASE_URL}oauth`, {
        params: {
          code: code,
        },
      });
      console.log('로그인 성공', res); // 받은 데이터 출력
      console.log(res.headers['authorization']); // 이게 access-token
      console.log(res.headers['authorization-refresh']); // 이게 refresh-token
      dispatch(
        setToken({
          token: res.headers['authorization'],
          tokenRefresh: res.headers['authorization-refresh'],
        }),
      );
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

  const redirect_uri = 'https://i10e104.p.ssafy.io/'; // Redirect URI
  const REST_API_KEY = '218aa28a9e8fa4d947c106cb95b2ec1b';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}`;

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

  class star {
    constructor(x, y, size, time) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.time = time;
    }

    set() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.size = Math.random() * 12;
      this.time = Math.random() * 8;
  
      const background = document.getElementById("content");
      const starDiv = document.createElement("div");
      starDiv.className = "star";
  
      starDiv.style.position = "absolute";
      starDiv.style.left = this.x + "px";
      starDiv.style.top = this.y + "px";
      starDiv.style.width = this.size + "px";
      starDiv.style.height = this.size + "px";
      starDiv.style.backgroundColor = "white";
      starDiv.style.filter = "blur(5px)";
      starDiv.style.animation = `blink ${this.time}s steps(5) infinite`;
  
      background.appendChild(starDiv);
    }
  }
  return (
    <div className="content">
      <div>
      <div class="star"></div>
        <h1 className="text-purple-700">별자리에 오신 것을 환영합니다.</h1>

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
              <label>email : </label>
              <input
                className="text-purple-700"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label> 비밀번호 : </label>
              <input
                className="text-purple-700"
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
