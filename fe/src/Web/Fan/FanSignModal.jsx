import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFansign } from '../Stores/joinFansignReducer';
import axios from 'axios';
import './FanSignModal.css';
import useAxios from '../axios';
import { useNavigate } from 'react-router-dom';

function FanSignModal({ data, onClose }) {
  // console.log(data);

  const stationData = useSelector((state) => state.join.stationData); // 대기방 참여 정보
  //const token = useSelector((state) => state.auth.token)
  const token = useSelector((state) => state.token.token);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const fanSignId = data.memberfansignId;

  const [fanSignDetail, setFanSignDetail] = useState('');

  console.log(fanSignDetail);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}applyPage/detail/${fanSignId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setFanSignDetail(res.data.object);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [fanSignId]);

  // 모달 바깥 영역을 클릭하면 모달을 닫습니다.
  const handleCloseModal = (e) => {
    onClose();
  };

  // 모달 컨텐츠 영역의 이벤트가 바깥으로 전파되지 않도록 합니다.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // 대기방 참가 로직
  const navigate = useNavigate;
  const dispatch = useDispatch();

  const customAxios = useAxios();
  const joinStation = async () => {
    const response = await customAxios.get(
      `fan/fansigns/enterwaiting/${fanSignId}`,
    );
    dispatch(getFansign(response));

    // navigate('/test', {
    //   state: {
    //     watch: 3,
    //     sessionId: stationData.sessionId,
    //     tokenId: stationData.tokenId,
    //     memberFansignId: fanSignId,
    //   },
    // });
    // closeModal();
  };

  return (
    <div>
      {fanSignDetail.isWon ? (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalContentClick}>
            <h1>당첨된 애들 모달</h1>
            <div>{fanSignId}번 싸인회 상세보기</div>
            {/* 여기에 추가적인 모달 컨텐츠 */}
            <div>
              {fanSignDetail.status === 'SESSION_CONNECTED' ? (
                <button>입장하기</button>
              ) : null}
            </div>
            <button onClick={() => onClose()}>닫기</button>
            {/* 모달을 닫는 버튼 */}
          </div>
        </div>
      ) : (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalContentClick}>
            <h1>응모한 애들 모달</h1>
            <div>{fanSignId}번 싸인회 상세보기</div>
            {/* 여기에 추가적인 모달 컨텐츠 */}
            <button onClick={() => onClose()}>닫기</button>
            {/* 모달을 닫는 버튼 */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FanSignModal;
