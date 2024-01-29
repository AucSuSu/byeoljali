import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import { FansignData } from '../../data.js';

export default function Fansign() {
  const dispatch = useDispatch();
  // const fansignList = useSelector((state) => state.artistInfo.data.object);
  const fansignList = FansignData.object;

  const payload = { artistId: 1, status: 'FANSIGN' };
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
            status={null}
          />
        ))}
      </div>
    </>
  );
}
