import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './Web/Pages/LoginView.jsx';
import ArtistInfoView from './Web/Pages/ArtistInfoView.jsx';
import HomeView from './Web/Pages/HomeView.jsx';
import Artist from './Openvidu/Artist/Artist.js';
import FanInfoView from './Web/Pages/FanInfoView.jsx';
import FanPhoto from './Web/Pages/FanPhotoView.jsx';
import FanPhotoPayResult from './Web/Fan/FanPhotoPayResult.jsx';
import ArtistFanSignView from './Web/Pages/ArtistReadyFansignView.jsx';
import ArtistReadyFansignView from './Web/Pages/ArtistFanSignView.jsx';
import FanApplyView from './Web/Pages/FanApplyView.jsx';
import FanWinView from './Web/Pages/FanWinView.jsx';
import Capture from './Web/Utils/Capture.jsx';
import FanView from './Openvidu/View/FanView.jsx';
import ArtistView from './Openvidu/View/ArtistView.jsx';
import SearchPage from './Web/Pages/SearchPage.jsx';
import CurrentApply from './Web/Home/remake/CurrentApply.jsx';
import CommingSoon from './Web/Home/remake/CommingSoon.jsx';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/artist-profile" element={<ArtistInfoView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/fan-profile" element={<FanInfoView />} />
        <Route path="/fan-photo" element={<FanPhoto />} />
        <Route path="/fan-photo/payresult" element={<FanPhotoPayResult />} />
        <Route path="/fansign" element={<ArtistFanSignView />} />
        <Route path="/readyfansign" element={<ArtistReadyFansignView />} />
        <Route path="/fan-apply" element={<FanApplyView />} />
        <Route path="/fan-win" element={<FanWinView />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/fan-fansign" element={<FanView />} />
        <Route path="/artist-fansign" element={<ArtistView />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/current-apply" element={<CurrentApply />} />
        <Route path="/comming-soon" element={<CommingSoon />} />

        {/* 라우트 여기에 추가하세용 */}
      </Routes>
    </Router>
  );
}
