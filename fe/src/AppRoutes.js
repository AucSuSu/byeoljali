import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './Web/Pages/LoginView.jsx';
import ArtistInfoView from './Web/Pages/ArtistInfoView.jsx';
import HomeView from './Web/Pages/HoemView.jsx';
import Test from './Web/test.js';
import CounterView from './Web/Pages/CounterView.jsx';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="counter" element={<CounterView />} />
        <Route path="/artistInfo" element={<ArtistInfoView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/test" element={<Test />} />
        {/* 라우트 여기에 추가하세용 */}
      </Routes>
    </Router>
  );
}
