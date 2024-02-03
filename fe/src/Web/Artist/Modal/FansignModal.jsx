import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { handleFansignInfo } from '../../Stores/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fansignDetail } from '../../Stores/artistFansignReducer';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../axios.js';

export default function FansignModal({ memberFansignId }) {
  const detailData = useSelector((state) => state.artistFansign.detail);

  const customAxios = useAxios();
  const modalIsOpen = true;

  const getFansignDetail = async () => {
    const response = await customAxios
      .get(`memberfansign/${memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    dispatch(fansignDetail(response));
  };

  const joinFansign = async () => {
    const response = await customAxios
      .get(`fan/fansigns/enterFansign/${memberFansignId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getFansignDetail();
  }, []);

  const closeModal = () => {
    dispatch(handleFansignInfo(null));
  };

  const participate = async () => {
    const openviduData = await joinFansign();
    navigate('/test', {
      state: {
        propsData: {
          watch: 1,
          sessionId: openviduData.object.sessionId,
          tokenId: openviduData.object.tokenId,
          memberFansignId: memberFansignId,
          title: detailData.object.title,
          member: detailData.object.memberName,
          artistFansignId: detailData.object.artistFansignId,
        },
      },
    });
    closeModal();
  };

  const customStyle = {
    content: {
      width: '500px',
      height: '500px',
      margin: 'auto',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="테스트입니다"
        style={customStyle}
      >
        {detailData && (
          <div>
            <h2>팬싸인회 정보보기</h2>
            <img
              src={detailData.object.posterImageUrl}
              alt="문구 넣기"
              style={{
                width: '100px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
            <ul>
              <li>
                타이틀 <p>{detailData.object.title}</p>
              </li>
              <li>
                공지사항 <p>{detailData.object.information}</p>
              </li>
              <li>
                응모시작 <p>{detailData.object.startApplyTime}</p>
              </li>
              <li>
                응모마감 <p>{detailData.object.endApplyTime}</p>
              </li>
              <li>
                팬싸인회 <p>{detailData.object.startFansignTime}</p>
              </li>
              <li>
                개설맴버 <p>{detailData.object.memberName}</p>
              </li>
              <li>
                현재상태 <p>{detailData.object.status}</p>
              </li>
            </ul>
            {true && <button onClick={participate}>팬싸인 참가하기</button>}
            <button onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </Modal>
    </>
  );
}
