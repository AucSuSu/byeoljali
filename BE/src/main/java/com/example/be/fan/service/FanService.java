package com.example.be.fan.service;

import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.jwt.TokenService;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.config.oauth.KakaoProfile;
import com.example.be.config.oauth.OauthToken;
import com.example.be.config.redis.RedisService;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.s3.S3Uploader;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FanService {

    private final FanRepository fanRepsitory;
    private final TokenService tokenService;
    private final S3Uploader s3Uploader;
    private final RedisService redisService;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    // 프로필 수정하기
    // 인증사진 등록하기
    // 프로필 페이지 정보 모두 가져오기 -> id로 가져오기

    public FanMyPageResponseDto findById(){
        Fan entity = getFan();
        return new FanMyPageResponseDto(entity);
    }

    public Long update(FanMyPageUpdateRequestDto dto){
        Fan fan = getFan();
        try {
            String imageUrl ;
            if(dto.getProfileImage() == null) {
                imageUrl = null;
            }else
                imageUrl = s3Uploader.uploadProfile(dto.getProfileImage(), "fan", fan.getEmail());
            fan.update(dto.getName(), dto.getNickname(), fan.getProfileImageUrl());
            fanRepsitory.save(fan);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fan.getFanId();
    }

    public int updateCertificationImageUrl(MultipartFile certImage){
        Fan fan = getFan();
        if(fan.getChangeCount() == 4){
            throw new IllegalArgumentException("변경횟수를 초과하였습니다.");
        }else {
            try {
                String imageUrl = s3Uploader.uploadCertImage(certImage, "fan", fan.getEmail());
                fan.updateCertificationImageUrl(imageUrl);
                fanRepsitory.save(fan);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return fan.getChangeCount();
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
    public JwtToken saveFanAndGetToken(String token){

        // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
        KakaoProfile profile = findProfile(token);
        System.out.println(profile);
        Optional<Fan> fan = fanRepsitory.findByEmail(profile.getKakao_account().getEmail());

        Fan realFan = fan.orElseGet(() -> {
            Fan newFan = new Fan(profile.getKakao_account().getEmail(),
                    profile.getKakao_account().getProfile().getProfile_image_url(),
                    profile.getKakao_account().getProfile().getNickname(),
                    0, false);
            fanRepsitory.save(newFan);
            return newFan;
        });
        return createToken(realFan);

    }

    private KakaoProfile findProfile(String token) {

        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + token);

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        System.out.println(kakaoProfileResponse.getBody());
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;

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


    // 로그인할 fan 정보로 Token 만들기
    public JwtToken createToken(Fan fan){
        // HMAC 방식으로 암호화 된 토큰
        Long fanId = fan.getFanId();
        String accessToken = tokenService.generateAccessToken(fanId, "ROLE_FAN");
        String refreshToken = tokenService.generateRefreshToken(fanId, "ROLE_FAN");
        redisService.setValuesWithTimeout("REFRESH_TOKEN_FAN_" + fanId.toString(), refreshToken,
            JwtProperties.ACCESS_EXPIRATION_TIME);

        return new JwtToken(accessToken, refreshToken);

    }

    private Fan getFan(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FanPrincipalDetails fanPrincipalDetails = (FanPrincipalDetails) authentication.getPrincipal();
        return fanPrincipalDetails.getFan();
    }

}