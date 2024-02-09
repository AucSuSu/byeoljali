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
      // setImageFile(img)
      console.log('img data : ', img);
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
      <div className="flex justify-center">
        {imageSrc ? (
          <img
            id="image-preview"
            className=" w-[200px] h-[200px] object-cover rounded-xl border-2 border-pink"
            src={imageSrc}
            alt="Preview"
          />
        ) : (
          <div className="w-[200px] h-[200px] bg-green-500">
            {' '}
            커버 이미지 추가
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
        className="bg-pink text-black px-4 py-3 rounded-xl mx-auto block mt-4"
        onClick={handleButtonClick}
      >
        이미지 업로드하기
      </button>
    </>
  );
}
