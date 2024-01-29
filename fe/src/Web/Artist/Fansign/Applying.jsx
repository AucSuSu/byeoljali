import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import { ApplyingData } from '../../data.js';

export default function Applying() {
  const dispatch = useDispatch();
  // const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const fansignList = ApplyingData.object;

  const status = 'APPLYING';
  const payload = { artistId: 1, status: 'APPLYING' };
  useEffect(() => {
    dispatch(getFanSignInfo(payload));
  }, []);

  return (
    <>
      <div>
        {fansignList.map((fansign) => (
          <FansignList
            key={fansign.memberFansignId}
            data={fansign}
            status={status}
          />
        ))}
      </div>
    </>
  );
}
