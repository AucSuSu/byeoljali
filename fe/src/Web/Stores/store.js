import { configureStore, combineReducers } from '@reduxjs/toolkit';
import applyListReducer from './applyListReducer.js';
import authReducer from './authReducer.js';
import artistInfoReducer from './artistInfoReducer.js';
import counterReducer from './counterReducer.js'; // 추가 리듀서
import modalReducer from './modalReducer.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Persist 구성 정의
const persistConfig = {
  key: 'root',
  storage,
};

// 여러 리듀서를 결합
const rootReducer = combineReducers({
  applyList: applyListReducer,
  auth: authReducer,
  modal: modalReducer,
  artistInfo: artistInfoReducer,
  counter: counterReducer, // 추가 리듀서 추가
});

// rootReducer에 대한 Persist Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store 구성
const store = configureStore({
  reducer: persistedReducer, // 여기에서 persistedReducer 사용
});

const persistor = persistStore(store);

// store와 persistor 내보내기
export { store, persistor };
