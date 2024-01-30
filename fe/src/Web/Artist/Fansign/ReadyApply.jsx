import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { ReadyApplyData } from '../../data.js';

export default function ReadyApply() {
  const fansignList = useSelector((state) => state.artistInfo.data);
  const dispatch = useDispatch();
  // const fansignList = ReadyApplyData.object;

  const status = 'READY_APPLYING';

  useEffect(() => {
    dispatch(getFanSignInfo(status));
    console.log('useEffect 동작');
  }, []);

  console.log('팬싸인 리스트 : ', fansignList);
  return (
    <>
      {/* {fansignList && (
        <div>
          {fansignList.map((fansign) => (
            <FansignList
              key={fansign.memberFansignId}
              data={fansign}
              status={status}
            />
          ))}
        </div>
      )} */}
    </>
  );
}
