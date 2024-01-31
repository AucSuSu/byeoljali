import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './FanSignModal.css';

function FanSignModal({ data }) {
  console.log(data);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const fanSignId = data.memberfansignId;

  const [fanSignDetail, setFanSignDetail] = useState('');

  console.log(fanSignDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}applyPage/detail/${fanSignId}`);
        console.log(res.data);
        setFanSignDetail(res.data.object);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [fanSignId]);

  return (
    <div style={backgroundStyle}>
      <div style={modalStyle}>
        <h1>하이</h1>
        <div>{fanSignId}번 싸인회 상세보기</div>
        {/* 여기에 추가적인 모달 컨텐츠 */}
      </div>
    </div>
  );
}

export default FanSignModal;
