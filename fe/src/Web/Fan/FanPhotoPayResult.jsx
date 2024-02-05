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
        // axios
        const payPhotoId = Number(response.data.item_code);
        axios
          .put(`https://i10e104.p.ssafy.io/api/myalbum/${payPhotoId}`)
          .then((res) => {
            console.log(res);
            navigate('/fan-photo');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error('에러입니다.');
        console.error(error);
      });
  };

  return (
    <div className="bg-white font-milk flex flex-col items-center justify-center m-12">
      <h1 className="text-4xl font-bold mb-6 border-b-2">카카오페이 결제</h1>
      <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-4">
        <span className="text-gray-500 font-semibold">Logo 들어감</span>
      </div>
      <p className="mb-2 text-xl font-bold">카카오페이 결제 완료 후</p>
      <p className="mb-12 text-xl font-bold">
        브라우저에서 결제 완료 버튼을 눌러주세요!
      </p>
      <button
        onClick={handleApprove}
        className="bg-kakao-yellow  active:bg-yellow-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        결제 완료
      </button>
    </div>
  );
}

export default FanPhotoPayResult;
