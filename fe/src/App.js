import React from 'react';
import Test from './Web/test.js';
import { Provider } from 'react-redux';
import store from './Web/Stores/store.js';
import Home from './Web/Pages/HoemView.jsx';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
