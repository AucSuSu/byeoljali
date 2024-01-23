package com.example.be.fan.service;


import com.example.be.config.oauth.OauthToken;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class FanService {

    private final FanRepository fanRepsitory;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    // 프로필 수정하기
    // 인증사진 등록하기
    // 프로필 페이지 정보 모두 가져오기 -> id로 가져오기

    public FanMyPageResponseDto findById(Long id){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        return new FanMyPageResponseDto(entity);
    }

    public Long update(Long id, FanMyPageUpdateRequestDto requestDto){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        entity.update(requestDto.getNickname(),requestDto.getProfileImageUrl());
        return id;
    }

    public int updateCertificationImageUrl(Long id, String certificationImageUrl){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        // 이거 질문하기
        if(entity.getChangeCount() == 4){
            new IllegalArgumentException("변경횟수를 초과하였습니다."); // 어차피 front에서 막겠지만 만약
        }else {
            entity.updateCertificationImageUrl(certificationImageUrl);
        }

        return entity.getChangeCount();
    }

    // 블랙리스트 등록
    public Long addBlacklist(Long id){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        entity.addBlacklist();

        return id;

    }


    /**
     * OAuth 관련
     */

    // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
    public Fan saveFan(String token){
        return null;
    }




    // 카카오 회원 정보를 가져오기 위한 토큰 발급
    public OauthToken getAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", kakaoClientSecret); // 생략 가능!

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
            "https://kauth.kakao.com/oauth/token",
            HttpMethod.POST,
            kakaoTokenRequest,
            String.class
        );


        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken;
    }



}