import React, { useRef, useState, useEffect } from 'react';
import useAxios from '../../axios';
import { useSelector } from 'react-redux';

function ModifyMemberModal({ onClose, data }) {
  const customAxios = useAxios();
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(data.profileImageUrl);
  const [name, setName] = useState(data.name);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc(data.profileImageUrl);
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePost = () => {
    if (!imageFile) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', name);

    customAxios
      .put(`artists/member/${data.memberId}`, formData, {
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

  return (
    <div
      className="font-milk fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50"
      onClick={onClose}
    >
      <div
        className="w-148 h-130 bg-[url('/public/bg.png')] p-6 shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="self-start text-4xl font-bold mb-6">
          멤버 프로필 수정
          <div className="mt-1 border-b-2"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg self-start">프로필 이미지</div>
          <div className="relative mb-4">
            <img
              src={imageSrc}
              alt="Preview"
              className="w-100 h-80 rounded-lg object-fill"
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
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요"
            className="w-full p-2 rounded-md border-2 mb-4"
          />
        </div>

        {/* Buttons */}
        <div className="flex w-72">
          <button
            onClick={handlePost}
            className="flex-1 py-2 px-4 mr-7 bg-hot-pink text-white font-semibold rounded-md"
          >
            등록
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-light-gray  font-semibold rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyMemberModal;
