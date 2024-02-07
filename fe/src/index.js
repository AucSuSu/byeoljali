import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker'; 이거 캐시 저장해서 속도 높임
// 밑의 import는 캐시 저장 x(개발단계용)
import unregister from './registerServiceWorker';
import Modal from 'react-modal';

//모달이 열릴 때, App 컴포넌트의 루트 요소를 지정
Modal.setAppElement('#root');

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker(); 이거 캐시 저장
// 개발 단계용 캐시 저장 x
unregister();
