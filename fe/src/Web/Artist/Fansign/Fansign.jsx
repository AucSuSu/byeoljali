import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistInfoReducer.js';
import FansignList from './FansignList.jsx';

export default function Fansign() {
  const dispatch = useDispatch();
  const fansignList = useSelector((state) => state.artistInfo.data1.object);

  useEffect(() => {
    dispatch(getFanSignInfo('FANSIGN'));
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
