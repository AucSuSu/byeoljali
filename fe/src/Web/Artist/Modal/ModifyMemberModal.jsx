import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyMember } from '../../Stores/modalReducer';
import { modifyMember } from '../../Stores/artistInfoReducer';
import { useDispatch } from 'react-redux';
import ImgUpload from './ImgUpload';

export default function ModifyMember({ data }) {
  const modalIsOpen = useState(true);
  const [imgData, setImgData] = useState('');
  const [name, setName] = useState(data.name);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModifyMember(null));
  };

  const payload = { name: name, image: imgData };

  const modify = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    console.log(formData);
    console.log('페이로드 : ', payload);

    dispatch(modifyMember(formData));
    closeModal();
  };

  const uploadImg = (img) => {
    setImgData(img);
    console.log('이미지 데이터 : ', img);
  };

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={data.name}
        style={customStyle}
      >
        <div>
          <h2>{data.name}</h2>
          {/* <img
            src={data.profileImageUrl}
            alt={data.name}
            style={{ width: '400px', borderRadius: '10px' }}
          /> */}
          <ImgUpload img={data.profileImageUrl} uploadImg={uploadImg} />

          <form onSubmit={modify}>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">수정하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
