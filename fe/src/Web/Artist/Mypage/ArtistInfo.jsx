import React, { useState, useEffect } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import './ArtistInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistInfo } from '../../Stores/artistInfoReducer.js';
import axios from 'axios';

export default function ArtistInfo() {
  const refreshToken = useSelector((state) => state.auth.tokenRefresh);
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistInfo());
  }, []);

  const getRefresh = () => {
    console.log('토큰 : ', refreshToken);
    const response = axios.get(`https://i10e104.p.ssafy.io/api/refreshToken`, {
      headers: {
        'authorization-refreshToken': refreshToken,
      },
    });
    console.log('리스폰 : ', response);
    return response;
  };
  return (
    <>
      <button onClick={getRefresh}> refresh test</button>
      {artistData && (
        <div>
          <h1 className="text-blue-500">ArtistInfo</h1>
          <div className="artist">
            <img
              className="artistImg"
              src={artistData.object.artistImageUrl}
              alt="에스파임"
            />

            <div>
              <h3>{artistData.object.name}</h3>
              <p>{artistData.object.companyName}</p>
            </div>
          </div>
          <div className="members">
            <div className="bar">
              <p>Members</p>
              <AddMemberModal />
            </div>

            <div>
              <div>
                {artistData.object.memberList.map((member) => (
                  <MemberList key={member.memberId} data={member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
