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
      setImageSrc(img)
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
    <div>
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
    </div>
  );
}
