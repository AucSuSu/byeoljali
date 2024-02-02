import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import useAxios from '../../axios.js';

export default function Applying() {
  const fansignList = useSelector((state) => state.artistFansign.data);

  const customAxios = useAxios();
  const getFansign = async () => {
    const response = await customAxios
      .get(`artists/apply?status=${status}`)
      .then((res) => {
        return res.data;
      });
    dispatch(getFansignInfo(response));
  };

  const dispatch = useDispatch();

  const status = 'APPLYING';

  useEffect(() => {
    getFansign();
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
