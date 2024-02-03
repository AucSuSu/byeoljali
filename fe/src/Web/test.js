import React, { useState } from 'react';
import Station from '../Openvidu/Station/Station.js';
import Fan from '../Openvidu/Fan/Fan.js';
import Artist from '../Openvidu/Artist/Artist.js';
import Socket from '../Openvidu/Socket.js';
import { useLocation } from 'react-router-dom';
import useAxios from '../Web/axios.js';

export default function Test() {
  const customAxios = useAxios();

  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterFansign/${memberFansignId}`)
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

  // Station에서 Meeting 버튼을 눌렀을 때 Fan 팬싸방으로 이동할 려고 만든 함수
  const switchToFan = async (data) => {
    const openviduData = await joinFansign();
    setFanData(openviduData);
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
      <Socket memberFansignId={propsData.memberFansignId} />

      {flag === 1 && <Artist propsData={propsData} />}
      {flag === 2 && (
        <Fan
          fanData={data}
          goBackStation={switchToStation}
          sessionId={fanData.object.sessionId}
          token={fanData.object.tokenId}
        />
      )}
      {flag === 3 && (
        <Station
          wait={wait}
          onMeetingClick={switchToFan}
          sessionId={propsData.sessionId}
          token={propsData.tokenId}
        />
      )}
    </div>
  );
}
