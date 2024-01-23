import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// import { authAction } from '../Store/auth.jsx';

// import './LoginView.css';

export default function LoginView() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  //   const auth = useSelector((state) => state.auth.auth);
  //   const counter = useSelector((state) => state.counter.counter);

  const handleFanLogin = () => {
    // dispatch(authAction.login());
    navigate('/artistInfo');
  };

  const handleArtistLogin = (e) => {
    e.preventDefault();
    // dispatch(authAction.logout());
    navigate('/artistInfo');
  };

  return (
    <div className="content">
      <div>
        <h1>별자리에 오신 것을 환영합니다.</h1>
        <p>로그인하여 당신의 스타와 만나보세요</p>
        <p>{/* {auth}, {counter} */}</p>
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
                value={id}
                onChange={(e) => setId(e.target.value)}
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
