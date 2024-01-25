import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo, handleAddFansign } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';

export default function FansignModal({ type }) {
  const modalIsOpen = useState(true);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleFansignInfo(null));
  };

  const data = useSelector((state) => state.artistInfo.data);
  const participate = () => {
    // 팬싸인 세션 이동 추가
    console.log('팬싸인 세션 이동 추가');
  };

  useEffect(() => {
    // dispatch() // 실제 axios 요청으로 변경
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
        {/* 팬싸인 정보보기 */}
        {type === 'info' && (
          <div>
            <h2>팬싸인회 정보보기</h2>
            <img
              src="url 넣기"
              alt="문구 넣기"
              style={{
                width: '100px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
            <ul>
              <li>
                타이틀 <p>타이틀입니다</p>
              </li>
              <li>
                공지사항 <p>공지사항 필요</p>
              </li>
              <li>
                응모시작 <p>옹모시작시간</p>
              </li>
              <li>
                응모마감 <p>응모마감시간</p>
              </li>
              <li>
                응모방식 <p>응모방식</p>
              </li>
              <li>
                팬싸인회 <p>팬싸인회</p>
              </li>
              <li>
                개설맴버 <p>개설맴버</p>
              </li>
              <li>
                현재상태 <p>현재상태</p>
              </li>
            </ul>
            {nowState === 'fansign' && (
              <button onClick={participate}>팬싸인 참가하기</button>
            )}
            <button onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </Modal>
    </>
  );
}
