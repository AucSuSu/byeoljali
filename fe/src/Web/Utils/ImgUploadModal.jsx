import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './ImgUploadModal.css';

function ImgUploadModal({ onClose, posturl }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const fileInputRef = useRef(null);

  // 이미지 업로드 관련 URL 설정
  const IMG_POST_URL = posturl;

  console.log(IMG_POST_URL);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc('');
    }
  }, [imageFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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

    axios
      .post(IMG_POST_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading the image: ', error);
        alert('Error uploading image');
      });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>이미지 업로드 모달</h1>
        <div>
          {imageSrc && <img id="image-preview" src={imageSrc} alt="Preview" />}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
        <button className="upload-btn" onClick={handleButtonClick}>
          Upload Image
        </button>
        <button className="post-btn" onClick={handlePost}>
          POST
        </button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ImgUploadModal;
