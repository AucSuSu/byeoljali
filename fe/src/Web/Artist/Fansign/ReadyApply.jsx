import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { ReadyApplyData } from '../../data.js';

export default function ReadyApply() {
  const fansignList = useSelector((state) => state.artistFansign.data);
  const dispatch = useDispatch();
  // const fansignList = ReadyApplyData.object;

  const status = 'READY_APPLYING';

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
