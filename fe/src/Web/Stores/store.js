import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter.jsx';
import applyListReducer from './applyListReducer.js';

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    applyList: applyListReducer,
  },
});
export default store;
