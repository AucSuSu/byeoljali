import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { ReadyFansignData } from '../../data.js';

export default function ReadyFansign() {
  const fansignList = useSelector((state) => state.artistInfo.data);
  const dispatch = useDispatch();
  // const fansignList = ReadyFansignData.object;

  const status = 'READY_FANSIGN';

  useEffect(() => {
    dispatch(getFanSignInfo(status));
    console.log('작동함');
  }, []);

  dispatch;
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
