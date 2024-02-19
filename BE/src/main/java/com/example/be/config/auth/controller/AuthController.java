package com.example.be.config.auth.controller;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.jwt.service.TokenService;
import com.example.be.config.oauth.OauthToken;
import com.example.be.config.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final OAuthService oAuthService;
    private final TokenService tokenService;

    // 프론트 측에서 인가코드를 받아오는 메소드
    @GetMapping("/api/oauth")
    public ResponseEntity<String> getLogin(@RequestParam("code") String code){

        // 넘어온 인가 코드를 통해 카카오 유저 정보를 얻기위한 access_token 발급
        OauthToken oauthToken = oAuthService.getAccessToken(code);

        // 발급받은 accessToken 으로 카카오 회원 정보 DB 저장
        JwtToken jwtToken = oAuthService.saveFanAndGetToken(oauthToken.getAccess_token());

        // response 할 headers 설정
        HttpHeaders headers = new HttpHeaders();

        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh, isArtist, Kakao-Authorization"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        headers.add(JwtProperties.KAKAO_ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + oauthToken.getAccess_token());
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getRefreshToken());
        headers.add("isArtist", "false");
        return ResponseEntity.ok().headers(headers).body("success");
    }

    @GetMapping("/api/refreshToken")
    public ResponseEntity<Message> getRefreshToken(HttpServletRequest request){

        String refreshToken = request.getHeader("authorization-refresh");
        JwtToken jwtToken = tokenService.verifyRefreshToken(refreshToken);

        Message message = new Message(HttpStatusEnum.OK, "엑세스 토큰, 리프레시 토큰 재발급 완료", jwtToken.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        // 기존에 accessToken만 넣어주던걸 -> refreshToken도 추가해줌
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getRefreshToken());


        return ResponseEntity.ok().headers(headers).body(message);
    }
    @PostMapping("/api/logout")
    public ResponseEntity<Message> kakaoLogout(HttpServletRequest request){
        String accessToken = request.getHeader("authorization");
        String kakaoAccessToken = request.getHeader("kakao-authorization");

        Long logoutId = oAuthService.logout(kakaoAccessToken, accessToken);
        Message message = new Message(HttpStatusEnum.OK, "팬 로그아웃 완료", logoutId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @DeleteMapping("/api/logout")
    public ResponseEntity<Message> logout(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");

        Long id = tokenService.deleteRefreshToken(accessToken);
        Message message = new Message(HttpStatusEnum.OK, "리프레쉬 토큰 삭제 완료", id);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
