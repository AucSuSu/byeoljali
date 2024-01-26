import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadApply } from '../Stores/fanApplyListReducer';

function FanListApply() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);

  useEffect(() => {
    dispatch(loadApply());
  }, [dispatch]);

  console.log(data);

  return (
    <div>
      <h1>하이요</h1>
    </div>
  );
}

export default FanListApply;
