import React, { useState } from 'react';
import Station from '../Station/Station.js';
import Fan from '../Fan/Fan.js';
import FanSocket from './FanSocket.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../Web/axios.js';
import Swal from 'sweetalert2';

export default function FanView() {
  const customAxios = useAxios();
  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterFansign/${propsData.memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { propsData } = location.state || {};
  console.log('프롭데이터 : ', propsData);
  const [fanData, setFanData] = useState(null);

  const [flag, setFlag] = useState(false);
  const [stationData, setStationData] = useState(null);
  const [curUser, setCurUser] = useState(0);
  const [joinTrigger, setJoinTrigger] = useState(false); // Staion에서 Fan으로 이동하는 트리거

  // Station에서 Meeting 버튼을 눌렀을 때 Fan 팬싸방으로 이동할 려고 만든 함수
  const switchToFan = async (data) => {
    if (data.isSame === true) {
      const openviduData = await joinFansign();
      setFanData(openviduData);
      setStationData(data);
      setFlag(!flag);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '인증 되지 않아 입장에 실패했어요',
        background: '#222222',
        confirmButtonColor: '#FF2990',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/home');
        }
      });
    }
  };

  const joinSignal = () => {
    setJoinTrigger(!joinTrigger);
  };

  const updateCurUser = (e) => {
    setCurUser(e);
  };

  return (
    <div>
      <FanSocket
        propsData={propsData}
        stationData={stationData}
        joinSignal={joinSignal}
        updateCurUser={updateCurUser}
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
          curUser={curUser}
          propsData={propsData}
          switchToFan={switchToFan}
          joinFansign={joinTrigger} // 트리거
        />
      )}
    </div>
  );
}
