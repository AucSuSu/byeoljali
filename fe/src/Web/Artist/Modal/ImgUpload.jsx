import React, { useRef, useState, useEffect } from 'react';
import './ImgUploadModal.css';

export default function ImgUpload({ img, uploadImg }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
      uploadImg(imageFile);
    } else {
      setImageSrc('');
    }
  }, [imageFile]);

  useEffect(() => {
    if (img) {
      setImageSrc(img);
    }
  }, [img]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="flex justify-center text-align ">
        {imageSrc ? (
          <img
            id="image-preview"
            className="w-[500px] h-[450px] object-cover rounded-xl border-2 border-pink"
            src={imageSrc}
            alt="Preview"
          />
        ) : (
          <div className="w-[500px] h-[450px] bg-gray rounded-xl border-2 border-pink">
            {' '}
          </div>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
      <button
        className="bg-pink text-white px-4 py-3 rounded-xl mx-auto block "
        onClick={handleButtonClick}
      >
        이미지 업로드하기
      </button>
    </>
  );
}
