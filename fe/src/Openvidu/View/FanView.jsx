import React, { useState } from 'react';
import Station from '../Station/Station.js';
import Fan from '../Fan/Fan.js';
import FanSocket from './FanSocket.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../Web/axios.js';

export default function Test() {
  const customAxios = useAxios();
  const navigator = useNavigate();
  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterFansign/${propsData.memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  };

  const location = useLocation();
  const { propsData } = location.state || {};
  console.log('프롭데이터 : ', propsData);
  const [fanData, setFanData] = useState(null);

  const [flag, setFlag] = useState(false);
  const [stationData, setStationData] = useState(null);

  const [joinTrigger, setJoinTrigger] = useState(false); // Staion에서 Fan으로 이동하는 트리거

  // Station에서 Meeting 버튼을 눌렀을 때 Fan 팬싸방으로 이동할 려고 만든 함수
  const switchToFan = async (data) => {
    const openviduData = await joinFansign();
    setFanData(openviduData);
    setStationData(data);
    setFlag(!flag);
  };

  const joinSignal = () => {
    setJoinTrigger(!joinTrigger);
  };
  const closeSignal = () => {
    navigator('/home');
  };

  return (
    <div>
      <FanSocket
        propsData={propsData}
        recievePostit={stationData}
        joinSignal={joinSignal}
        closeSignal={closeSignal}
      />

      {flag && (
        <Fan
          propsData={propsData}
          recieveScript={stationData}
          sessionId={fanData.object.sessionId}
          token={fanData.object.tokenId}
        />
      )}
      {!flag && (
        <Station
          propsData={propsData}
          switchToFan={switchToFan}
          joinFansign={joinTrigger} // 트리거
        />
      )}
    </div>
  );
}
