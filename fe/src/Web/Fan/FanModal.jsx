import React from 'react';
import './FanModal.css'; // 모달을 위한 CSS 파일

function FanModal({ onClose, onPay, onDelete, data }) {
  return (
    <div>
      {data.pay === false ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
            <div className="button-group">
              <button onClick={onPay}>결제하기</button>
              <button onClick={onDelete}>삭제하기</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
            <img src={data.photoUrl} alt="팬싸 사진" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FanModal;
