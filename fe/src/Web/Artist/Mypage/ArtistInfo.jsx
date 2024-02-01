import React, { useState, useEffect } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import './ArtistInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistInfo } from '../../Stores/artistInfoReducer.js';
import { getInfo } from '../../Stores/artistInfoReducer.js';
import axios from 'axios';
import useAxios from '../../axios.js';

export default function ArtistInfo() {
  // const refreshToken = useSelector((state) => state.auth.tokenRefresh);
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistInfo());
  }, []);

  const customAxios = useAxios();

  const test = () => {
    const response = customAxios.get(`artists/`);
    dispatch(getInfo(response));
  };

  // const test = () => {
  //   const response = axios.get('http://localhost:8080/api/refreshToken', {
  //     headers: {
  //       'authorization-refresh': refreshToken,
  //     },
  //   });
  //   console.log('리스폰 : ', response.Object);

  //   return response;
  // };

  return (
    <>
      <button onClick={test}> refresh test</button>
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
