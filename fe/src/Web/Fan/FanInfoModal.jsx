import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editUserData } from '../Stores/fanInfoReducer';
import { getUserData } from '../Stores/fanInfoReducer';
import './FanInfoModal.css';

function FanInfoModal({ userData, onClose, onReset }) {
  const dispatch = useDispatch();
  const [localUserData, setLocalUserData] = useState({
    nickname: userData.nickname,
    name: userData.name,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기 URL을 위한 상태
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

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(localUserData).forEach((key) => {
      formData.append(key, localUserData[key]);
    });
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    console.log(formData);
    dispatch(editUserData({ formData })); // 서버에 데이터 전송
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal">
      {/* 모달 내용 */}
      <input
        name="nickname"
        value={localUserData.nickname}
        onChange={handleInputChange}
      />
      <input
        name="name"
        value={localUserData.name}
        onChange={handleInputChange}
      />
      <div className="image-upload-container">
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="image-preview" />
        )}
        <input
          type="file"
          name="profileImage"
          onChange={handleImageChange}
          style={{ display: 'none' }} // input을 숨깁니다.
          ref={fileInputRef}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="upload-button"
        >
          이미지 업로드
        </button>
      </div>
      <button onClick={handleSubmit}>저장</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default FanInfoModal;