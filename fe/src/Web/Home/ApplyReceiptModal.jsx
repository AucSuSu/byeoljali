import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ApplyReceiptModal({ onClose, title }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const fileInputRef = useRef(null);

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
    formData.append('fansignTitle', title);

    console.log(formData);

    axios
      .post(`flask/checkreceipt`, formData, {
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-150"
      onClick={onClose}
    >
      <div
        className="w-120 h-auto bg-white flex flex-col items-center "
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="bolder text-2xl mt-2 mb-6">영수증을 등록해주세요!</h1>
        </div>
        <div>
          <div className="relative mb-4">
            <img
              src={imageSrc}
              alt="Preview"
              className="w-72 h-80 rounded-lg object-fill"
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
        <div className="flex gap-3">
          <button
            className="bg-hot-pink text-white px-4 py-2 rounded-xl mb-8"
            onClick={handlePost}
          >
            제출
          </button>
          <button
            className="bg-light-gray text-black px-4 py-2 rounded-xl"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyReceiptModal;
