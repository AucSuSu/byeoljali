import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { FansignData } from '../../data.js';

export default function Fansign() {
  const fansignList = useSelector((state) => state.artistInfo.data);
  const dispatch = useDispatch();
  // const fansignList = FansignData.object;

  const status = 'FANSIGN';

  useEffect(() => {
    dispatch(getFanSignInfo(status));
  }, []);

  return (
    <>
      {fansignList && (
        <div>
          {fansignList.map((fansign) => (
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
