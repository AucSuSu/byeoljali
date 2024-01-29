import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadApply } from '../Stores/fanApplyListReducer';

import FanSignList from '../Fan/FanSignList';

function FanApply() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);

  useEffect(() => {
    dispatch(loadApply());
  }, [dispatch]);

  console.log(data);

  return (
    <div>
      <h1>응모 페이지</h1>
      {data.map((data, index) => (
        <FanSignList key={index} data={data} />
      ))}
    </div>
  );
}

export default FanApply;
