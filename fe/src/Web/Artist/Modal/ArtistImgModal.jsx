import React, { useRef, useState, useEffect } from 'react';
import useAxios from '../../axios';
import { useSelector } from 'react-redux';

function ArtistImgModal({ onClose, artistImageUrl, logoImageUrl }) {
  const customAxios = useAxios();
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(artistImageUrl);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [logoImageSrc, setlogoImageSrc] = useState(logoImageUrl);
  const profileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc(artistImageUrl);
    }
    if (logoImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setlogoImageSrc(reader.result);
      };
      reader.readAsDataURL(logoImageFile);
    } else {
      setlogoImageSrc(logoImageUrl);
    }
  }, [imageFile, logoImageFile]);

  const handleProfileFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  const handleLogoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoImageFile(file);
    }
  };
  const handleProfileButtonClick = () => {
    profileInputRef.current.click();
  };
  const handleLogoButtonClick = () => {
    logoInputRef.current.click();
  };
  const handlePost = async () => {
    if (!imageFile && !logoImageFile) {
      alert('이미지를 선택해주세요');
      return;
    }

    const formData = new FormData();
    if (imageFile) formData.append('profileImage', imageFile);
    if (logoImageFile) formData.append('logoImage', logoImageFile);

    customAxios
      .put(`artists/image`, formData, {
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
      className="font-jamsil fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50"
      onClick={onClose}
    >
      <div
        className="w-250 h-130 bg-deep-dark p-10 shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mt-3">
          {/* 프로필 이미지 업로드 섹션 */}
          <div>
            <h2 className="text-[24px]">프로필 이미지 등록</h2>
            <div className="relative mb-4">
              <img
                src={imageSrc}
                alt="Profile Preview"
                className="w-100 h-80 rounded-lg object-fill"
              />
              <button
                onClick={handleProfileButtonClick}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
              >
                <span className="text-white text-5xl">+</span>
              </button>
            </div>
            <input
              type="file"
              onChange={handleProfileFileChange}
              className="hidden"
              ref={profileInputRef}
            />
          </div>

          {/* 로고 이미지 업로드 섹션 */}
          <div className="ml-8">
            <h2 className="text-[24px]">로고 이미지 등록</h2>
            <div className="relative mb-4">
              <img
                src={logoImageSrc}
                alt="Logo Preview"
                className="w-100 h-80 rounded-lg object-fill"
              />
              <button
                onClick={handleLogoButtonClick}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
              >
                <span className="text-white text-5xl">+</span>
              </button>
            </div>
            <input
              type="file"
              onChange={handleLogoFileChange}
              className="hidden"
              ref={logoInputRef}
            />
          </div>
        </div>

        {/* 등록 및 닫기 버튼 */}
        <div className="flex w-72 mt-8">
          <button
            onClick={handlePost}
            className="flex-1 py-2 px-4 mr-7 bg-hot-pink text-white font-semibold rounded-md"
          >
            등록
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-light-gray font-semibold rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtistImgModal;
