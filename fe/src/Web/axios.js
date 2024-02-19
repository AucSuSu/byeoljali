import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './Stores/authReducer';

const API_URL = 'https://i10e104.p.ssafy.io/api/';
// const API_URL = 'http://localhost:8080/api/';

export default function useAxios() {
  const accessToken = useSelector((state) => state.auth.token);
  const refreshToken = useSelector((state) => state.auth.tokenRefresh);

  const [tokens, setTokens] = useState({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { authorization: tokens.accessToken },
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      const originalRequest = error.config;

      // 토큰 만료에 대한 에러 코드를 확인 (401, 등)하고 refreshToken으로 새 토큰을 받아오기
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // refreshToken으로 새로운 accessToken을 받아오는 API 요청을 구현해야 합니다.
          const response = await axios.get(`${API_URL}refreshToken`, {
            headers: {
              'authorization-refresh': tokens.refreshToken,
            },
          });

          // 리프레시 토큰을 사용하여 새 액세스 토큰을 받아옵니다.
          const newAccessToken = response.headers.authorization;

          dispatch(
            setToken({
              token: newAccessToken,
              tokenRefresh: tokens.refreshToken,
            }),
          );
          setTokens({
            accessToken: newAccessToken,
            refreshToken: tokens.refreshToken,
          });

          // 실패한 요청의 헤더를 새 토큰으로 업데이트하고, 요청을 다시 실행합니다.
          const newRequest = Object.assign({}, originalRequest, {
            headers: Object.assign({}, originalRequest.headers, {
              authorization: newAccessToken,
            }),
          });

          return axiosInstance(newRequest);
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw error;
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
