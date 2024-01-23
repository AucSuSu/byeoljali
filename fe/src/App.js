import React from 'react';
import { Provider } from 'react-redux';
import store from './Web/Stores/store.js';
import HomeView from './Web/Pages/HoemView.jsx';
import LoginView from './Web/Pages/LoginView.jsx';
import ArtistInfoView from './Web/Pages/ArtistInfoView.jsx';
import Test from './Web/test.js';
import AppRoutes from './AppRoutes.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@material-ui/icons';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      {/* <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/artistInfo" element={<ArtistInfoView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router> */}
    </Provider>
  );
}
