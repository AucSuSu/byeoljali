import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import useAxios from '../../axios.js'

export default function ReadyApply() {
  const fansignList = useSelector((state) => state.artistFansign.data);
  const customAxios = useAxios()
  const getFansign = async () => {
    const response = await customAxios.get(`artists/apply?status=${status}`).then((res) => {
      return res.data;
    });
    dispatch(getFansignInfo(response));
  }
  
  const dispatch = useDispatch();

  const status = 'READY_APPLYING';

  useEffect(() => {
    getFansign()
  }, []);

  return (
    <>
      {fansignList.object && (
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
