import React, { useEffect } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import './ArtistInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../Stores/artistInfoReducer.js';
import useAxios from '../../axios.js';
import Socket from '../../../Openvidu/Socket.js';

export default function ArtistInfo() {
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const dispatch = useDispatch();
  useEffect(() => {
    test();
  }, []);

  const customAxios = useAxios();

  const test = async () => {
    const response = await customAxios.get(`artists/`).then((res) => {
      return res.data;
    });
    dispatch(getInfo(response));
  };

  return (
    <>
      <button onClick={test}> refresh test</button>
      <Socket />
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
