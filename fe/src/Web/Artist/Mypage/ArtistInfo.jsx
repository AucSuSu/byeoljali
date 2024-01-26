import React, { useState, useEffect } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import './ArtistInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistInfo } from '../../Stores/artistInfoReducer.js';
import { artistData } from '../../data.js';
export default function ArtistInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistInfo(1)); // artistId
  }, []);

  // const artistData = useSelector((state) => state.artistInfo.data.object);

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
        </div>
      </div>
      <div className="members">
        <div className="bar">
          <p>Members</p>
          <AddMemberModal />
        </div>

        <div>
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
