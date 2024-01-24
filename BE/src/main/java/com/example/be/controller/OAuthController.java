package com.example.be.controller;

import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.oauth.OauthToken;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.service.FanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OAuthController {


    private final FanService fanService;

    // 프론트 측에서 인가코드를 받아오는 메소드
    @GetMapping("/oauth")
    public ResponseEntity<String> getLogin(@RequestParam("code") String code){

        // 넘어온 인가 코드를 통해 카카오 유저 정보를 얻기위한 access_token 발급
        OauthToken oauthToken = fanService.getAccessToken(code);

        // 발급받은 accessToken 으로 카카오 회원 정보 DB 저장

        JwtToken jwtToken = fanService.saveFanAndGetToken(oauthToken.getAccess_token());

        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getRefreshToken());

        return ResponseEntity.ok().headers(headers).body("success");

    }
}
