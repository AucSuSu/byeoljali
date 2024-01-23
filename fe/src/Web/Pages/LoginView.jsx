import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../Stores/authReducer.js';

import './LoginView.css';

export default function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  const handleFanLogin = () => {
    dispatch(authAction.login());
    navigate('/artistInfo');
  };

  const handleArtistLogin = (e) => {
    e.preventDefault();
    dispatch(authAction.logout());

    // 로그인
    // axios.post('url',{
    //   email : email,
    //   password : password
    // })
    // .then(res => {
    //   console.log('로그인 성공', res)
    //   navigate('/home')
    // })
    // .catch(err =>{
    //   console.log('로그인 실패', err)
    // })
  };

  return (
    <div className="content">
      <div>
        <h1>별자리에 오신 것을 환영합니다.</h1>
        <p>로그인하여 당신의 스타와 만나보세요</p>
        <p> {auth ? 'True' : 'False'}</p>
      </div>

      <div className="login-section">
        <div>
          <h3>Fan 로그인</h3>
          <img src="/kakao.png" alt="Hi" onClick={handleFanLogin} />
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
