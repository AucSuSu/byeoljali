import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
// import { ReadyFansignData } from '../../data.js';

export default function ReadyFansign() {
  const fansignList = useSelector((state) => state.artistFansign.data);
  const dispatch = useDispatch();
  // const fansignList = ReadyFansignData.object;

  const status = 'READY_FANSIGN';

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
