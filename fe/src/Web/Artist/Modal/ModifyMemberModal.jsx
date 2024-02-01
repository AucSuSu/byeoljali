import React, { useState } from 'react';
import Modal from 'react-modal';
import { handleModifyMember } from '../../Stores/modalReducer';
import { modifyMebmer } from '../../Stores/artistInfoReducer';
import { useDispatch } from 'react-redux';
import ImgUpload from './ImgUpload';
import useAxios from '../../axios';


export default function ModifyMember({ data }) {
  const customAxios = useAxios()

  const memberModify = async (formData) => {
    const response = await customAxios.put(`artists/members/${data.memberId}`, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
      console.log('데이터 : ', res)
      return res.data;
    });
    dispatch(modifyMebmer(response));
  };
  
  const [imgData, setImgData] = useState(data.profileImageUrl);
  const [name, setName] = useState(data.name);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleModifyMember(null));
  };

  const payload = { name: name, image: imgData, memberId: data.memberId };

  const modify = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    console.log('페이로드 : ', payload);
    memberModify(formData)
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
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel={data.name}
        style={customStyle}
      >
        <div>
          <h2>{data.name}</h2>
          <ImgUpload img={data.profileImageUrl} uploadImg={uploadImg} />
          <form onSubmit={modify}>
            <div>
              <label>이름 : </label>
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
