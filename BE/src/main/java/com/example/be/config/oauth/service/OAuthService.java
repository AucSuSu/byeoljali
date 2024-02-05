package com.example.be.config.oauth.service;

import com.example.be.config.jwt.JwtToken;
import com.example.be.config.jwt.service.TokenService;
import com.example.be.config.oauth.KakaoProfile;
import com.example.be.config.oauth.OauthToken;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final FanRepository fanRepository;
    private final TokenService tokenService;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    private String logoutRedirectUri;

    /**
     * OAuth 관련
     */

    // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
    public JwtToken saveFanAndGetToken(String token){

        // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
        KakaoProfile profile = findProfile(token);

        // 이메일이 없으면 null 리턴
        if (profile.getKakao_account().getEmail() == null){
            return null;
        }
        System.out.println(profile);
        Optional<Fan> fan = fanRepository.findByEmail(profile.getKakao_account().getEmail());
        Fan realFan = fan.orElseGet(() -> {
            Fan newFan = new Fan(profile.getKakao_account().getEmail(),
                    profile.getKakao_account().getProfile().getProfile_image_url(),
                    profile.getKakao_account().getProfile().getNickname(),
                    0, false);
            fanRepository.save(newFan);
            return newFan;
        });
        return tokenService.createToken(realFan);

    }

    private void logout(){

        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();

        String kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout"
                + "?client_id=" + kakaoClientId
                + "&logout_redirect_uri=" + logoutRedirectUri;

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                kakaoLogoutUrl,
                HttpMethod.GET,
                kakaoProfileRequest,
                String.class
        );


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

        //Response 데이터 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = null;
        try {
            jsonObj = (JSONObject) jsonParser.parse(kakaoProfileResponse.getBody());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        JSONObject account = (JSONObject) jsonObj.get("kakao_account");
        JSONObject profile = (JSONObject) account.get("profile");

        long id = (long) jsonObj.get("id");
        String email = String.valueOf(account.get("email"));
        String nickname = String.valueOf(profile.get("nickname"));
        String profileImage = String.valueOf(profile.get("profile_image_url"));

        System.out.println("id : " + id);
        System.out.println("email : " + email);
        System.out.println("nickname : " + nickname);
        System.out.println("profileImage : " + profileImage);

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
}
