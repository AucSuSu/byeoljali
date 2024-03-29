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
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const data = { email: email, password: password };

  useEffect(() => {
    if (token) {
      if (isArtist) {
        navigate('/artist-profile');
      } else {
        navigate('/home');
      }
    }
  }, [token]);

  // Kakao

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
  }, []);

  const getData = async (code) => {
    try {
      // 백엔드로 인가 코드를 전송하여 데이터 요청
      const res = await axios.get(`${BASE_URL}oauth`, {
        params: {
          code: code,
        },
      });
      dispatch(
        setToken({
          token: res.headers['authorization'],
          tokenRefresh: res.headers['authorization-refresh'],
          isArtist: res.headers['isartist'] === 'true',
          kakaoAuthorization: res.headers['kakao-authorization'],
          artistId: res.headers['artistId'],
        }),
      );
    } catch (error) {
      console.error('백엔드 전송 실패', error);
    }
  };

  const redirect_uri = 'https://i10e104.p.ssafy.io/'; // Redirect URI
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
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

  return (
    <div>
      <div
        className="font-jamsil"
        style={{
          position: 'fixed',
          top: 0,
          left: 20,
          zIndex: 1000,
        }}
        onClick={() => window.location.reload()}
      >
        <div className="mt-4">
          <h1
            className="text-2xl mb-5 text-white font-hambuger"
            style={{ cursor: 'pointer' }}
          >
            별자리
          </h1>
        </div>
      </div>

      <div className="content flex flex-col justify-center items-center font-jamsil bg-black">
        <div className="night">
          {[...Array(20)].map((_, index) => (
            <div
              className="shooting_star"
              key={index}
              style={{
                top: `${getRandomNumber(0, 100)}%`,
                left: `${getRandomNumber(0, 100)}%`,
                animationDelay: `-${getRandomNumber(0, 3000)}ms`,
              }}
            ></div>
          ))}
        </div>
        <div className="login w-full min-h-1/2 p-4 bg-opacity-70 flex flex-col  mb-4">
          <div className="mb-8 flex-grow items-center justify-center text-3xl text-white">
            <div
              className="h-full pt-10 mx-auto"
              style={{ lineHeight: '1.8', letterSpacing: '2.2px' }}
            >
              간편하게 응모부터 팬싸인회까지 <br />
              한 번에 가능한 영통 팬싸인회 플랫폼 별자리
              <br /> 아이돌과 둘만의 추억을 간직하세요!
            </div>
          </div>

          <div className="mt-2 mb-3 item flex items-center justify-center">
            <div
              className="cursor-pointer bg-kakao-yellow py-3 px-4 rounded-md w-[400px] h-[50px] text-black"
              onClick={handleFanLogin}
            >
              카카오톡 로그인
            </div>
          </div>

          <div className="mb-4 flex flex-col items-center justify-center">
            <p
              className="cursor-pointer text-light-gray py-2 px-4 rounded-md w-1/2"
              onClick={viewArtistLogin}
            >
              {showLoginForm ? '접기' : '기업 로그인'}
            </p>

            {showLoginForm && (
              <form onSubmit={handleArtistLogin} className="md-2 mt-2">
                <div className="flex items-center">
                  <label className="md:w-1/3 text-white pr-4">이메일 </label>
                  <input
                    className="md:w-2/3
                      bg-slate  rounded-md m-2 pl-2"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center">
                  <label className="md:w-1/3 text-white">비밀번호 </label>
                  <input
                    className="md:w-2/3
                      bg-slate  rounded-md m-2 pl-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 bg-neon-red p-2 rounded-md text-sm px-5"
                >
                  로그인
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
