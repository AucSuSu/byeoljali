import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWin } from '../Stores/fanApplyListReducer';

function FanListWin() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);

  useEffect(() => {
    dispatch(loadWin());
  }, [dispatch]);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{/* 구현예정 */}</div>
      ))}
    </div>
  );
}

export default FanListWin;
