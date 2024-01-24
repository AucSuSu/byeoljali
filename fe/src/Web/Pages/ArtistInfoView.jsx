import React, { useState, useEffect } from 'react';
import ArtistInfoModify from '../Artist/ArtistInfoModify.jsx';
import MemberList from '../Artist/MemberList.jsx';
import './ArtistInfoView.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddMember, handleModifyArtist } from '../Stores/modalReducer.js';
import { getArtistInfo } from '../Stores/artistInfoReducer.js';

export default function ArtistInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistInfo(1));
  }, []);

  const artistData = useSelector((state) => state.artistInfo.data.object);
  const modifyArtist = useSelector((state) => state.modal.modifyArtist);
  const addMember = useSelector((state) => state.modal.addMember);

  const modifyArtistInfo = () => {
    dispatch(handleModifyArtist());
  };

  return (
    <>
      <h1 className="text-blue-500">ArtistInfo</h1>
      <div className="artist">
        <img
          className="artistImg"
          src={artistData.artistImageUrl}
          alt="에스파임"
        />

        <div>
          <h3>{artistData.name}</h3>
          <p>{artistData.companyName}</p>
          <button onClick={modifyArtistInfo}>수정하기</button>
        </div>
      </div>
      <div className="members">
        <div className="bar">
          <p>아티스트</p>
          <button>+</button>
          {modifyArtist && <ArtistInfoModify data={artistData} />}
        </div>

        <div>
          <h1>맴버 리스트</h1>
          <div>
            {artistData.memberList.map((member) => (
              <MemberList key={member.memberId} data={member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
