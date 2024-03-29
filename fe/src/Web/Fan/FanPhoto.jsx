import React, { useState } from 'react';
import axios from 'axios';
import FanModal from './FanPhotoModal';

import { useDispatch } from 'react-redux';
import { setTid } from '../Stores/kakaopayReducer';

function FanPhoto({ data }) {
  const PHOTO_URL = 'https://i10e104.p.ssafy.io/';
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SERVICE_APP_ADMIN_KEY = process.env.REACT_APP_KAKAO_PAY_API_KEY;

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePayment = () => {
    setIsModalOpen(false);
    const formData = new URLSearchParams();
    formData.append('cid', 'TC0ONETIME');
    formData.append('partner_order_id', 'partner_order_id');
    formData.append('partner_user_id', 'partner_user_id');
    formData.append('item_name', '인생네컷');
    formData.append('item_code', data.photoId.toString());
    formData.append('quantity', 1);
    formData.append('total_amount', 11000);
    formData.append('vat_amount', 1000);
    formData.append('tax_free_amount', 10000);
    formData.append('approval_url', `${PHOTO_URL}fan-photo/payresult/`);
    formData.append('fail_url', `${PHOTO_URL}fan-photo/`);
    formData.append('cancel_url', `${PHOTO_URL}fan-photo/`);

    axios
      .post('https://kapi.kakao.com/v1/payment/ready', formData, {
        headers: {
          Authorization: `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((response) => {
        // tid storage 저장
        dispatch(setTid(response.data.tid));
        // Redirect to the payment approval page
        window.location.href = response.data.next_redirect_pc_url;
      })
      .catch((error) => {});
    // 결제 처리 로직
  };

  const handleDelete = () => {
    const deletePhotoId = data.photoId;
    axios
      .delete(`${PHOTO_URL}api/myalbum/${deletePhotoId}`)
      .then((res) => {
        setIsModalOpen(false);
      })
      .catch((err) => {});

    // 삭제 처리 로직
  };

  return (
    <div className="text-white bg-slate-900 rounded-md">
      <div className="w-[80%] ml-[10%] relative">
        <img
          src={data.photoUrl}
          alt={`사진 ${data.photoId}`}
          onClick={handleImageClick}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-auto aspect-square cursor-pointer hover:scale-105 transition-transform ease-in-out duration-500 mt-8 mb-2"
        />
        <div>
          {data.pay === 'N' ? (
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-85
                        flex items-center justify-center text-white p-4
                        hover:bg-black hover:bg-opacity-90
                        "
            >
              <button onClick={handleImageClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-48 h-48"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-[80%] ml-[10%]">
        <div className="text-18 mt-5 mb-10">[ {data.artistFansignTitle} ]</div>
      </div>

      {isModalOpen && (
        <FanModal
          onClose={handleCloseModal}
          onPay={handlePayment}
          onDelete={handleDelete}
          data={data}
        />
      )}
    </div>
  );
}

export default FanPhoto;
