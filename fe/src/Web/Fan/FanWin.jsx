import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWin } from '../Stores/fanApplyListReducer';

function FanWin() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);

  useEffect(() => {
    dispatch(loadWin());
  }, [dispatch]);

  console.log(data);

  return (
    <div>
      <h1>당첨 페이지</h1>
    </div>
  );
}

export default FanWin;
