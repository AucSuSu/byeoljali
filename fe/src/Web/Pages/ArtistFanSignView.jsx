import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../Stores/artistInfoReducer';
import FansignList from '../Artist/FansignList.jsx';

export default function ArtistFanSignView() {
  const dispatch = useDispatch();
  const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const status = [
    'READY_APPLYING',
    'APPLYING',
    ' READY_FANSIGN',
    'FANSIGN',
    'FINISH',
  ];

  const addFansign = () => {
    // { 변수 && FansignModal => props값에 따라 조정}
  };

  useEffect(() => {
    dispatch(getFanSignInfo(status[0]));
  }, []);

  console.log(fansignList);
  return (
    <>
      <div>
        <h1>맴버 리스트</h1>
        <div>
          {fansignList.map((fansign) => (
            <FansignList key={fansign.memberFansignId} data={fansign} />
          ))}
        </div>
      </div>
      <button onClick={addFansign}>add Fansign</button>
    </>
  );
}
