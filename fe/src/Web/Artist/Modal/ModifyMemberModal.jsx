import React, { useRef, useState, useEffect } from 'react';
import useAxios from '../../axios';

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

  // 프로필 이미지 없이 멤버 이름만 수정가능.
  const handlePost = () => {
    const formData = new FormData();
    // 이미지 파일이 있으면 FormData에 추가
    if (imageFile) {
      formData.append('image', imageFile);
    }
    // 이름이 변경되었으면 FormData에 추가
    if (name !== data.name) {
      formData.append('name', name);
    }
    if (imageFile || name !== data.name) {
      customAxios
        .put(`artists/members/${data.memberId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          alert('수정이 완료되었습니다.');
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
    } else {
      alert('수정할 프로필 이미지 업로드 또는 이름을 입력해주세요.');
    }
  };

  return (
    <div
      className="font-jamsil fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50"
      onClick={onClose}
    >
      <div
        className="w-148 h-130 bg-black p-6 shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <div className="text-[25px] self-start mt-4">프로필 이미지</div>
          <div className="relative mt-3 mb-4">
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
            className="w-full p-2 rounded-md border-2 mb-8 mt-3 text-black font-jamsil"
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
