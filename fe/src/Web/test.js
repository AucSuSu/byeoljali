import React, { useState } from 'react';
import Station from '../Openvidu/Station/Station.js';
import Fan from '../Openvidu/Fan/Fan.js';
import Artist from '../Openvidu/Artist/Artist.js';
import { useLocation } from 'react-router-dom';
import { joinFansignTest } from './Stores/joinFansignReducer.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Test() {
  const location = useLocation();
  const { watch, sessionId, tokenId } = location.state || {};
  const fanData = useSelector((state) => state.joinFansign.testData);

  const dispatch = useDispatch();
  const [flag, setFlag] = useState(watch);
  const [data, setData] = useState(null);
  const [wait, setWait] = useState(undefined);

  const artistPage = () => setFlag(1);
  const fanPage = () => setFlag(2);
  const stationPage = () => setFlag(3);
  console.log(watch, sessionId, tokenId);

  // Station에서 Meeting 버튼을 눌렀을 때 Fan 팬싸방으로 이동할 려고 만든 함수
  const switchToFan = async (data) => {
    await dispatch(joinFansignTest(1));
    setData(data);
    setFlag(2);
  };

  // 팬싸인회 종료 후 다시 대기방으로 돌아감.
  const switchToStation = (wait) => {
    setWait(wait);
    setFlag(3);
  };

  return (
    <div>
      <div>
        <button onClick={artistPage}>아티스트</button>
        <button onClick={fanPage}>팬</button>
        <button onClick={stationPage}>스테이션</button>
      </div>

      {flag === 1 && <Artist sessionId={sessionId} token={tokenId} />}
      {flag === 2 && (
        <Fan
          fanData={data}
          goBackStation={switchToStation}
          sessionId={fanData.sessionId}
          token={fanData.tokenId}
        />
      )}
      {flag === 3 && (
        <Station
          wait={wait}
          onMeetingClick={switchToFan}
          sessionId={sessionId}
          token={tokenId}
        />
      )}
    </div>
  );
}
