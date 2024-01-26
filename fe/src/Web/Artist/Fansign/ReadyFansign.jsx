import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import { ReadyFansignData } from '../../data.js';

export default function ReadyFansign() {
  const dispatch = useDispatch();
  // const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const fansignList = ReadyFansignData.object;

  const payload = { artistId: 1, status: 'READY_FANSIGN' };
  useEffect(() => {
    dispatch(getFanSignInfo('payload'));
  }, []);

  return (
    <>
      <div>
        {fansignList.map((fansign) => (
          <FansignList key={fansign.memberFansignId} data={fansign} />
        ))}
      </div>
    </>
  );
}
