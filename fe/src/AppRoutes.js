import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './Web/Pages/LoginView.jsx';
import ArtistInfoView from './Web/Pages/ArtistInfoView.jsx';
import HomeView from './Web/Pages/HoemView.jsx';
import Test from './Web/test.js';
import CounterView from './Web/Pages/CounterView.jsx';
import FanInfoView from './Web/Pages/FanInfoView.jsx';
<<<<<<< HEAD
import Kakao from './Web/Pages/Kakao.jsx';
=======
import FanPhoto from './Web/Pages/FanPhotoView.jsx';
import FanPhotoPayReady from './Web/Fan/FanPhotoPayReady.jsx';
>>>>>>> fe/feat/myphoto

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginView />} />
        <Route path="counter" element={<CounterView />} />
        <Route path="/artistInfo" element={<ArtistInfoView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/test" element={<Test />} />
        <Route path="/userinfo" element={<FanInfoView />} />
<<<<<<< HEAD
        <Route path="/" element={<Kakao />} />
=======
        <Route path="/userphoto" element={<FanPhoto />} />
        <Route path="/userphoto/pay" element={<FanPhotoPayReady />} />
>>>>>>> fe/feat/myphoto

        {/* 라우트 여기에 추가하세용 */}
      </Routes>
    </Router>
  );
}
