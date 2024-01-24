import React from 'react';
import axios from 'axios';

function FanPhotoPayReady() {
  const SERVICE_APP_ADMIN_KEY = '51198a6f76318c2194379fc0ae87c499';

  const handlePayment = () => {
    const formData = new URLSearchParams();
    formData.append('cid', 'TC0ONETIME');
    formData.append('partner_order_id', 'partner_order_id');
    formData.append('partner_user_id', 'partner_user_id');
    formData.append('item_name', '인생네컷');
    formData.append('quantity', '1');
    formData.append('total_amount', '11000');
    formData.append('vat_amount', '1000');
    formData.append('tax_free_amount', '0');
    formData.append('approval_url', 'http://localhost:3000/userphoto/pay');
    formData.append('fail_url', 'http://localhost:3000/userphoto/pay');
    formData.append('cancel_url', 'http://localhost:3000/userphoto/pay');

    axios
      .post('https://kapi.kakao.com/v1/payment/ready', formData, {
        headers: {
          Authorization: `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((response) => {
        console.log('Response:', response.data);
        // Redirect to the payment approval page
        window.location.href = response.data.next_redirect_pc_url;
      })
      .catch((error) => {
        console.error('Payment error:', error);
      });
  };

  return (
    <>
      <h1>카카오페이 결제 테스트</h1>
      <button onClick={handlePayment}>
        <img
          src="https://developers.kakao.com/tool/resource/static/img/button/pay/payment_icon_yellow_medium.png"
          alt="결제하기"
        />
      </button>
    </>
  );
}

export default FanPhotoPayReady;
