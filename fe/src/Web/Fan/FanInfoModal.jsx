import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useAxios from '../axios';

function FanInfoModal({ userData, onClose }) {
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const [localUserData, setLocalUserData] = useState({
    nickname: userData.nickname,
    name: userData.name,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData.profileImageUrl); // 미리보기 URL을 위한 상태
  const fileInputRef = useRef(); // 파일 입력을 위한 ref

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData({ ...localUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      // FileReader를 사용하여 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundClick = () => {
    onClose(); // 모달 닫기
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation(); // 모달 내부 클릭시 이벤트 버블링 방지
  };

  const editUserInfoData = async (data) => {
    await customAxios
      .put('mypage/edit/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('업로드 성공', response.data);
        alert('Image uploaded successfully');
      })
      .catch((error) => {
        if (error.response && error.response.status === 413) {
          alert('이미지의 용량을 1MB 이하로 낮춰주세요');
        }
        console.error('Error uploading the image: ', error);
      });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(localUserData).forEach((key) => {
      formData.append(key, localUserData[key]);
    });
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    console.log(formData);
    editUserInfoData(formData); // 서버에 데이터 전송
    onClose(); // 모달 닫기
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50"
      onClick={handleBackgroundClick} // 여기에 클릭 이벤트 핸들러 추가
    >
      <div
        className="font-milk w-148 h-148 bg-[url('/public/bg.png')] p-6  shadow-lg flex flex-col items-center"
        onClick={handleModalContentClick} // 모달 내부 클릭 시 이벤트 버블링 방지
      >
        <div className="self-start text-4xl font-bold mb-4">
          정보 수정
          <div className="mt-1 border-b-2"></div>
        </div>
        {/* Profile Image Upload */}
        <div>
          <div className="self-start mb-2 font-bold text-xl">프로필 이미지</div>
          <div className="relative mb-4">
            <img
              src={previewUrl || 'path_to_default_image'}
              alt="Profile"
              className="w-72 h-60 rounded-lg object-fill"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              {/* Icon or text to indicate upload, hidden by default and only shown on hover/focus */}
              <span className="text-white text-5xl">+</span>
            </button>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>

        <div className="w-72">
          {/* Input Fields */}
          <div className="w-full mb-3">
            <div className="flex">
              <p className="font-bold text-lg">닉네임 </p>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={localUserData.nickname}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-b-1 py-2 px-3 bg-transparent focus:outline-none "
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="flex ">
              <p className="font-bold text-lg w-14 self-center">이름</p>
              <input
                type="text"
                id="name"
                name="name"
                value={localUserData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-b-1  py-2 px-3 bg-transparent focus:outline-none"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex w-full">
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 px-4 mr-7 bg-hot-pink text-white font-semibold rounded-md"
            >
              수정
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-light-gray  font-semibold rounded-md "
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FanInfoModal;
