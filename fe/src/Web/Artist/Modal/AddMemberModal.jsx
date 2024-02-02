import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import ImgUpload from './ImgUpload';
import { addMember } from '../../Stores/artistInfoReducer';
import useAxios from '../../axios.js';

export default function AddMemberModal() {
  const customAxios = useAxios();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [imgData, setImgData] = useState('');

  const addArtist = async (formData) => {
    const response = await customAxios
      .post(`artists/members`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log('데이터 : ', res);
        return res.data;
      });
    dispatch(addMember(response));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const payload = {
    name: name,
    image: imgData,
  };

  const add = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    addArtist(formData);
    closeModal();
  };

  const uploadImg = (img) => {
    setImgData(img);
    console.log('이미지 데이터 : ', img);
  };

  return (
    <>
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="맴버를 추가해주세요"
        style={customStyle}
      >
        <div>
          <h2 className="text-25">맴버를 추가해주세요</h2>
          <ImgUpload img={null} uploadImg={uploadImg} />
          <form onSubmit={add}>
            <div>
              <label>이름 : </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">추가하기</button>
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}
