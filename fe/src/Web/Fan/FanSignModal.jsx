import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import './FanSignModal.css';

function FanSignModal({ data, onClose }) {
  console.log(data);

  //const token = useSelector((state) => state.auth.token)
  const token = useSelector((state) => state.token.token);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const fanSignId = data.memberfansignId;

  const [fanSignDetail, setFanSignDetail] = useState('');

  console.log(fanSignDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}applyPage/detail/${fanSignId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(res.data);
        setFanSignDetail(res.data.object);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [fanSignId]);

  // 모달 바깥 영역을 클릭하면 모달을 닫습니다.
  const handleCloseModal = (e) => {
    onClose();
  };

  // 모달 컨텐츠 영역의 이벤트가 바깥으로 전파되지 않도록 합니다.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div className="modal-background" onClick={handleCloseModal}>
        <div className="modal-content" onClick={handleModalContentClick}>
          <h1>하이</h1>
          <div>{fanSignId}번 싸인회 상세보기</div>
          {/* 여기에 추가적인 모달 컨텐츠 */}
          <button onClick={() => onClose()}>닫기</button>{' '}
          {/* 모달을 닫는 버튼 */}
        </div>
      </div>
    </div>
  );
}

export default FanSignModal;
