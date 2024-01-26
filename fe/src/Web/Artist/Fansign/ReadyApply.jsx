import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFanSignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import { ReadyApplyData } from '../../data.js';

import ImgUpload from '../Modal/ImgUpload.jsx';

export default function ReadyApply() {
  const dispatch = useDispatch();
  // const fansignList = useSelector((state) => state.artistInfo.data1.object);
  const fansignList = ReadyApplyData.object;

  const payload = { artistId: 1, status: 'READY_APPLYING' };
  useEffect(() => {
    dispatch(getFanSignInfo('payload'));
  }, []);

  return (
    <>
      <ImgUpload></ImgUpload>
      <div>
        {fansignList.map((fansign) => (
          <FansignList key={fansign.memberFansignId} data={fansign} />
        ))}
      </div>
    </>
  );
}
