package com.example.be.config.oauth.controller;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.jwt.service.TokenService;
import com.example.be.config.oauth.OauthToken;
import com.example.be.config.oauth.service.OAuthService;
import com.example.be.fan.service.FanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class OAuthController {


    private final FanService fanService;
    private final OAuthService oAuthService;
    private final TokenService tokenService;
    // 프론트 측에서 인가코드를 받아오는 메소드
    @GetMapping("/api/oauth")
    public ResponseEntity<String> getLogin(@RequestParam("code") String code){

        System.out.println(code);
        // 넘어온 인가 코드를 통해 카카오 유저 정보를 얻기위한 access_token 발급
        OauthToken oauthToken = oAuthService.getAccessToken(code);

        // 발급받은 accessToken 으로 카카오 회원 정보 DB 저장
        JwtToken jwtToken = oAuthService.saveFanAndGetToken(oauthToken.getAccess_token());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh, isArtist"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getRefreshToken());
        headers.add("isArtist", "false");
        return ResponseEntity.ok().headers(headers).body("success");

    }

    @GetMapping("/api/refreshToken")
    public ResponseEntity<Message> getRefreshToken(HttpServletRequest request){

        String refreshToken = request.getHeader("authorization-refresh");
        System.out.println("리프레시 토큰 발급받은거 : " + refreshToken);
        String accessToken = tokenService.verifyRefreshToken(refreshToken);


        Message message = new Message(HttpStatusEnum.OK, "엑세스 토큰 발급 완료","nothing");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);

        return ResponseEntity.ok().headers(headers).body(message);
    }

//    @PostMapping("/api/re-agreement")
//    public ResponseEntity<Message> reAgreement(HttpServletRequest request){
//
//        // code가 필요함.
//        fanService.getAccessToken()
//
//
//        Message message = new Message(HttpStatusEnum.OK, "엑세스 토큰 발급 완료","nothing");
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
//        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
//
//        return ResponseEntity.ok().headers(headers).body(message);
//    }
}
