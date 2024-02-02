import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../Stores/authReducer.js';
import { setToken } from '../Stores/authReducer.js';
import axios from 'axios';
import './LoginView.css';
import { isArtist } from '../Stores/authReducer.js';
import { logout } from '../Stores/authReducer.js';

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
      console.log('서버 전송 성공 : ', res); // 받은 데이터 출력
      if (res.headers['no-email']) {
        alert('이메일 필수입력이에요 ^^');
        setCode(null);
        handleFanLogin();
      } else {
        dispatch(
          setToken({
            token: res.headers['authorization'],
            tokenRefresh: res.headers['authorization-refresh'],
          }),
        );
      }
    } catch (error) {
      console.error('백엔드 전송 실패', error);
      console.log(code);
    }
  };

  const redirect_uri = 'https://i10e104.p.ssafy.io/'; // Redirect URI
  const REST_API_KEY = '218aa28a9e8fa4d947c106cb95b2ec1b';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&prompt=login`;
  const handleFanLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleArtistLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  const [showLoginForm, setShowLoginForm] = useState(false);
  const viewArtistLogin = () => {
    setShowLoginForm(!showLoginForm);
  };

  // const kakaoLogout = () => {
  //   console.log('토큰 : ', token);
  //   axios
  //     .get(
  //       `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${redirect_uri}`,
  //     )
  //     .then(() => {
  //       console.log('로그아웃 성공이래요~');
  //     })
  //     .catch((e) => {
  //       console.log('에러 ㅠㅠ : ', e);
  //     });
  // };

  return (
    <div className="content flex flex-col items-center">
      <img
        src="/susu.jpg"
        alt="로고"
        className="my-4 rounded-full h-25 w-25 object-cover"
      />
      <div className="mb-4">
        <h1 className="text-3xl font-bold">별자리</h1>
        {/* <button onClick={kakaoLogout}>테스트 로그아웃</button> */}
      </div>

      <div className="login-section w-full h-1/2 border p-4 rounded-md bg-gray-200 flex flex-col justify-between">
        <div className="mb-4 flex-grow flex flex-col items-center justify-center">
          <div className="h-full p-2 mx-auto max-w-md">
            좋은 소식이에요! 이제 웹페이지를 통해 미미무 마미무 우미무미무에
            참여할 수 있어요! - 이하 생략 - 소중한 아이돌과의 기억에 남을 만남을
            놓치지 마세요!
          </div>
        </div>

        <div className="mb-4 item flex items-center justify-center">
          <div
            className="cursor-pointer bg-yellow-300 text-black py-2 px-4 rounded-md w-1/2"
            onClick={handleFanLogin}
          >
            카카오톡 로그인
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center justify-center">
          <p
            className="cursor-pointer bg-slate-400 text-white py-2 px-4 rounded-md w-1/2"
            onClick={viewArtistLogin}
          >
            {showLoginForm ? '접기' : '기업 로그인'}
          </p>

          {showLoginForm && (
            <form onSubmit={handleArtistLogin} className="md-2">
              <div className="mx-auto">
                <div className="flex">
                  <label className="text-purple-700">이메일:</label>
                  <input
                    className="w-full border p-2"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mx-auto">
                <div className="flex">
                  <label className="text-purple-700">비밀번호:</label>
                  <input
                    className="w-full border p-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-purple-700 text-white py-2 px-4 rounded-md"
              >
                로그인
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
