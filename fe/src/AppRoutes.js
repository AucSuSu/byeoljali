import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './Web/Pages/LoginView.jsx';
import ArtistInfoView from './Web/Pages/ArtistInfoView.jsx';
import HomeView from './Web/Pages/HoemView.jsx';
import Test from './Web/test.js';
import CounterView from './Web/Pages/CounterView.jsx';
import FanInfoView from './Web/Pages/FanInfoView.jsx';
import FanPhoto from './Web/Pages/FanPhotoView.jsx';
import FanPhotoPayResult from './Web/Fan/FanPhotoPayResult.jsx';
import ArtistFanSignView from './Web/Pages/ArtistFanSignView.jsx';
import ImgUploadModal from './Web/Utils/ImgUploadModal.jsx';
import ArtistReadyFansignView from './Web/Pages/ArtistReadyFansignView.jsx';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="counter" element={<CounterView />} />
        <Route path="/artistInfo" element={<ArtistInfoView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/test" element={<Test />} />
        <Route path="/userinfo" element={<FanInfoView />} />
        <Route path="/userphoto" element={<FanPhoto />} />
        <Route path="/userphoto/payresult" element={<FanPhotoPayResult />} />
        <Route path="/fansign" element={<ArtistFanSignView />} />
        <Route path="/imguploadtest" element={<ImgUploadModal />} />
        <Route path="/readyfansign" element={<ArtistReadyFansignView />} />

        {/* 라우트 여기에 추가하세용 */}
      </Routes>
    </Router>
  );
}
