import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadApply } from '../Stores/fanApplyListReducer';

function FanListApply() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);

  useEffect(() => {
    dispatch(loadApply());
  }, [dispatch]);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{/* 구현예정 */}</div>
      ))}
    </div>
  );
}

export default FanListApply;
