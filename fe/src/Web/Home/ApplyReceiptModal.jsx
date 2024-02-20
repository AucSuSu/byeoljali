import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { setAlbumNum } from '../Stores/homeDetailListReducer';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function ApplyReceiptModal({ onClose, albumName }) {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    'https://testbyeoljari.s3.ap-northeast-2.amazonaws.com/default-receipt.png',
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc(
        'https://testbyeoljari.s3.ap-northeast-2.amazonaws.com/default-receipt.png',
      );
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
    formData.append('albumName', albumName);

    axios
      .post(`flask/checkreceipt`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch(setAlbumNum(response.data.boughtAlbum));
        Swal.fire({
          icon: 'success',
          title: '영수증 인증 성공',
          background: '#222222',
          confirmButtonColor: '#FF2990',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            closeModal();
          }
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 413) {
          Swal.fire({
            icon: 'warning',
            title: '이미지 크기를 1mb 보다 낮춰주세요',
            background: '#222222',
            confirmButtonColor: '#FF2990',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: '영수증 인증 실패',
            text: '영수증이 인식되지 않습니다. 선명하게 올려주세요',
            background: '#222222',
            confirmButtonColor: '#FF2990',
            confirmButtonText: 'OK',
          });
        }
        console.error('Error uploading the image: ', error);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-70 bg-white flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="w-120 h-auto bg-deep-dark flex flex-col items-center "
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: '20px',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div>
          <h1 className="text-2xl mt-5 mb-6">영수증을 등록해주세요!</h1>
        </div>
        <div>
          <div className="relative mb-4">
            <img
              src={imageSrc}
              alt="Preview"
              className="w-80 h-80 rounded-lg mb-5 object-fill"
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
        <div className="flex gap-8">
          <button
            className="bg-hot-pink text-black px-4 py-2 rounded-xl mb-8"
            onClick={handlePost}
          >
            제출
          </button>
          <button
            className="bg-light-gray text-black px-4 py-2 rounded-xl mb-8"
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
