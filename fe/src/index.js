import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal';

//모달이 열릴 때, App 컴포넌트의 루트 요소를 지정
Modal.setAppElement('#root');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
