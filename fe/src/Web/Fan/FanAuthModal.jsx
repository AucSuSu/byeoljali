import React, { useRef, useState, useEffect } from 'react';
import useAxios from '../axios';
import { useSelector } from 'react-redux';

function FanAuthModal({ onClose, userData }) {
  const customAxios = useAxios();
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(userData.certificationImageUrl);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc(userData.certificationImageUrl);
    }
  }, [imageFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setImageFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = () => {
    if (!imageFile) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    customAxios
      .put(`mypage/edit/certImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('업로드 성공', response.data);
        onClose(); // 모달 닫기
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 413) {
          alert('이미지의 용량을 1MB 이하로 낮춰주세요');
        }
        console.error('Error uploading the image: ', error);
      });
  };

  return (
    <div
      className="font-big fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50"
      onClick={onClose}
    >
      <div
        className="w-148 h-130 bg-more-dark p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[30px] mb-6">
          인증사진 등록
          <div className="mt-1 border-b-2"></div>
        </div>

        <div>
          <div className="relative mb-4">
            <img
              src={imageSrc}
              alt="Preview"
              className="h-[300px] rounded-lg object-cover"
            />
            <button
              onClick={handleButtonClick}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              {/* Icon or text to indicate upload, hidden by default and only shown on hover/focus */}
              <span className="text-white text-5xl">+</span>
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-72">
          <button
            onClick={handlePost}
            className="flex-1 py-2 px-4 mr-7 bg-hot-pink rounded-md"
          >
            등록
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-blue-gray rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FanAuthModal;
