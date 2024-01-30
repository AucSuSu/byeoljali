import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { ApplyingData } from '../../data.js';

export default function Applying() {
  const dispatch = useDispatch();
  const fansignList = useSelector((state) => state.artistFansign.data);
  // const fansignList = ApplyingData.object;

  const status = 'APPLYING';

  useEffect(() => {
    dispatch(getFansignInfo(status));
  }, []);

  return (
    <>
      {fansignList && (
        <div>
          {fansignList.object.map((fansign) => (
            <FansignList
              key={fansign.memberFansignId}
              data={fansign}
              status={status}
            />
          ))}
        </div>
      )}
    </>
  );
}
