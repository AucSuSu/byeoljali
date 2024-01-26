import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeListReducer from './homeListReducer.js';
import authReducer from './authReducer.js';
import artistInfoReducer from './artistInfoReducer.js';
import kakaopayReducer from './kakaopayReducer.js';
import counterReducer from './counterReducer.js';
import modalReducer from './modalReducer.js';
import fanApplyReducer from './fanApplyListReducer.js';
// 추가 리듀서
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Persist 구성 정의
const persistConfig = {
  key: 'root',
  storage,
};

// 여러 리듀서를 결합
const rootReducer = combineReducers({
  home: homeListReducer,
  auth: authReducer,
  modal: modalReducer,
  artistInfo: artistInfoReducer,
  counter: counterReducer,
  kakaopay: kakaopayReducer,
  fanapply: fanApplyReducer,
  // 추가 리듀서 추가
});

// rootReducer에 대한 Persist Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store 구성
const store = configureStore({
  reducer: persistedReducer, // 여기에서 persistedReducer 사용
  middleware: (
    getDefaultMiddleware, // 에러 제거  - middleware에서 serialize 체크 안함
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

// store와 persistor 내보내기
export { store, persistor };
