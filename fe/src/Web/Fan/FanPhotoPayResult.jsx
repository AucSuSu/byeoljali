import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../Utils/NavBar';

function FanPhotoPayResult() {
  const SERVICE_APP_ADMIN_KEY = process.env.REACT_APP_KAKAO_PAY_API_KEY;

  //apprval_url 을 통해서 받아온 현재 주소에는 pg_token값이 붙어있다. 이를 추출하여야 함
  const location = useLocation();
  const navigate = useNavigate();
  //현재 로케이션값을 통해 어떤 값을 가져와야하는지 알 수 있다.
  // console.log(location);

  //search를 통해서 ?뒤에 붙은 값을 가져온다
  const url = location.search;
  //=뒤에 붙은 pg_token값을 가져온다.
  const pgToken = url.split('=')[1];

  //최종 token값이 완성된다.
  // console.log(pgToken);

  const tid = useSelector((state) => state.kakaopay.tid);

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
        // axios
        const payPhotoId = Number(response.data.item_code);
        axios
          .put(`https://i10e104.p.ssafy.io/api/myalbum/${payPhotoId}`)
          .then((res) => {
            navigate('/fan-photo');
          });
      })
      .catch((error) => {
        console.error('에러입니다.');
        console.error(error);
      });
  };

  return (
    <div className="w-[100%] h-[92.7vh]">
      <Navbar />
      <div className="w-full h-full bg-black text-white font-jamsil flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold mb-6 border-b-2 mt-6">
            카카오페이 결제
          </h1>
          <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-4">
            <img src="/image.png" alt="" />
          </div>
          <p className="mb-2 text-xl font-bold">카카오페이 결제 완료 후</p>
          <p className="mb-12 text-xl font-bold">
            브라우저에서 결제 완료 버튼을 눌러주세요!
          </p>
          <button
            onClick={handleApprove}
            className="mb-8 text-black bg-kakao-yellow  hover:scale-105 transition-transform ease-in-out duration-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:"
          >
            결제 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default FanPhotoPayResult;
