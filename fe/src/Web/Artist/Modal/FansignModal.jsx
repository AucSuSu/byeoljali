import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getFansignDetail } from '../../Stores/artistFansignReducer';
import { detail } from '../../data.js';
import { useNavigate } from 'react-router-dom';

export default function FansignModal() {
  const modalIsOpen = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleFansignInfo(null));
  };

  // const detailData = useSelector((state) => state.artistFansign.detail);
  const detailData = detail.object;

  const participate = () => {
    navigate('/artist', { sessionId: '?', artistId: '?' });
    closeModal();
    console.log('팬싸인 세션 이동 추가');
  };

  const memberfansignId = 1;
  useEffect(() => {
    dispatch(getFansignDetail(memberfansignId));
  }, []);
  const nowState = 'fansign';

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
      >
        <div>
          <h2>팬싸인회 정보보기</h2>
          <img
            src={detailData.posterImageUrl}
            alt="문구 넣기"
            style={{
              width: '100px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
          <ul>
            <li>
              타이틀 <p>{detailData.title}</p>
            </li>
            <li>
              공지사항 <p>{detailData.information}</p>
            </li>
            <li>
              응모시작 <p>{detailData.startApplyTime}</p>
            </li>
            <li>
              응모마감 <p>{detailData.endApplyTime}</p>
            </li>
            <li>
              팬싸인회 <p>{detailData.startFansignTime}</p>
            </li>
            <li>
              개설맴버 <p>{detailData.memberName}</p>
            </li>
            <li>
              현재상태 <p>{detailData.status}</p>
            </li>
          </ul>
          {detailData.sessioncreated && (
            <button onClick={participate}>팬싸인 참가하기</button>
          )}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
