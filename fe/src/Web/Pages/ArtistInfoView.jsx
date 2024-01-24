import React, { useState } from 'react';
import ArtistInfoModify from '../Artist/ArtistInfoModify.jsx';
import MemberInfoModify from '../Artist/MemberInfoModify.jsx';
import List from '../Utils/List.jsx';
import './ArtistInfoView.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddMember, handleModifyArtist } from '../Stores/modalReducer.js';

export default function ArtistInfo() {
  const dispatch = useDispatch();

  const addMember1 = useSelector((state) => state.modal.addMember);
  const modifyArtist = useSelector((state) => state.modal.modifyArtist);
  const dataList = useSelector((state) => state.applyList.dataList);

  const addMember = () => {
    dispatch(handleAddMember());
    console.log('click addMember', addMember1);
  };

  return (
    <>
      <h1 className="text-blue-500">ArtistInfo</h1>

      <div className="artist">
        <img className="artistImg" src="/aspa.png" alt="에스파임" />
        <div>
          <h3>Aspa</h3>
          <p>SM ENT</p>
          <button>수정하기</button>
        </div>
      </div>
      <div className="members">
        <div className="bar">
          <p>아티스트</p>
          <button onClick={addMember}>+</button>
          {addMember1 && <MemberInfoModify />}
        </div>

        <div>
          <h1>동글이 맴버 리스트</h1>
          <List dataList={dataList[0].object} />
        </div>
      </div>
    </>
  );
}
