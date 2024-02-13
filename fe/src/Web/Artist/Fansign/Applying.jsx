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
      <div className="relative">
        {fansignList && (
          <div className="w-[86%] ml-[7%] ">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 border-4 border-deep-dark rounded-lg z-10">
              {fansignList.object.map((data, index) => (
                <FansignList key={index} data={data} status={data.status} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
