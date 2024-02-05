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

  const [flag, setFlag] = useState(propsData.watch);
  const [data, setData] = useState(null);
  const [wait, setWait] = useState(undefined);
  const [joinTrigger, setJoinTrigger] = useState(false); // Sstaion에서 Fan으로 이동하는 트리거
  const [closeTrigger, setCloseTrigger] = useState(false); // Fan에서 Home으로 이동하는 트리거

  // Station에서 Meeting 버튼을 눌렀을 때 Fan 팬싸방으로 이동할 려고 만든 함수
  const switchToFan = async (data) => {
    const openviduData = await joinFansign();
    setFanData(openviduData);
    setData(data);
    setFlag(2);
  };

  // 팬싸인회 종료 후 홈으로 돌아감.
  const switchToStation = () => {
    navigator('/home');
  };

  const joinSignal = () => {
    setJoinTrigger(!joinTrigger);
  };
  const closeSignal = () => {
    setCloseTrigger(!closeTrigger);
  };

  return (
    <div>
      <FanSocket
        memberFansignId={propsData.memberFansignId}
        joinSignal={joinSignal}
        closeSignal={closeSignal}
        waitNo={propsData.orders}
      />

      {flag === 2 && (
        <Fan
          propsData={propsData}
          fanData={data}
          closeFansign={closeTrigger} // 트리거
          comeBackHome={switchToStation}
          sessionId={fanData.object.sessionId}
          token={fanData.object.tokenId}
        />
      )}
      {flag === 3 && (
        <Station
          propsData={propsData}
          wait={wait}
          onMeetingClick={switchToFan}
          joinFansign={joinTrigger} // 트리거
          sessionId={propsData.sessionId}
          token={propsData.tokenId}
        />
      )}
    </div>
  );
}
