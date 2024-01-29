import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function FanPhotoPayResult() {
  const SERVICE_APP_ADMIN_KEY = '51198a6f76318c2194379fc0ae87c499';

  //apprval_url 을 통해서 받아온 현재 주소에는 pg_token값이 붙어있다. 이를 추출하여야 함
  const location = useLocation();
  const navigate = useNavigate();
  //현재 로케이션값을 통해 어떤 값을 가져와야하는지 알 수 있다.
  console.log(location);
  //search를 통해서 ?뒤에 붙은 값을 가져온다
  const url = location.search;
  //=뒤에 붙은 pg_token값을 가져온다.
  const pgToken = url.split('=')[1];
  //최종 token값이 완성된다.
  console.log(pgToken);

  const tid = useSelector((state) => state.kakaopay.tid);
  console.log(tid);

  const handleApprove = () => {
    const formData = new URLSearchParams();
    formData.append('cid', 'TC0ONETIME');
    formData.append('tid', tid);
    formData.append('partner_order_id', 'partner_order_id');
    formData.append('partner_user_id', 'partner_user_id');
    formData.append('pg_token', pgToken);

    axios
      .post('https://kapi.kakao.com/v1/payment/approve', formData, {
        headers: {
          Authorization: `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((response) => {
        console.log(response.data); // 결제 요청 결과 확인
        console.log(response.data.amount); // 가격 확인
        console.log(response.data.amount.total); // 가격 확인
        console.log(response.data.quantity); // 수량 확인
        navigate('/userphoto');
      })
      .catch((error) => {
        console.error('에러입니다1.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>결제완료!!</h1>
      <button onClick={handleApprove}>결제 완료 버튼</button>
    </div>
  );
}

export default FanPhotoPayResult;
