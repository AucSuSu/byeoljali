package com.example.be.config.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.redis.RedisService;
import com.example.be.fan.entity.Fan;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final RedisService redisService;

    // 로그인할 fan 정보로 JWT Token 만들기
    public JwtToken createToken(Fan fan){
        // HMAC 방식으로 암호화 된 토큰
        Long fanId = fan.getFanId();
        String accessToken = generateAccessToken(fanId, "FAN");
        String refreshToken = generateRefreshToken(fanId, "FAN");
        redisService.setValuesWithTimeout("REFRESH_TOKEN_FAN_" + fanId.toString(), refreshToken,
                JwtProperties.ACCESS_EXPIRATION_TIME);

        return new JwtToken(accessToken, refreshToken, true);

    }

    private DecodedJWT verifyToken(String token){
        String refreshToken = token.substring(7);
        Algorithm algorithm = Algorithm.HMAC256(JwtProperties.SECRET);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(refreshToken);
    }

    // refresh 토큰 검증
    public String verifyRefreshToken(String token) {
        try {
            // JWT 서명 검증
            DecodedJWT jwt = verifyToken(token);

            // 토큰에서 role과 id 추출
            String role = jwt.getClaim("role").toString();
            String id = jwt.getClaim("artistId").toString();

            if( id == null) return "유효하지 않은 리프레시 토큰입니다.";

            String redisToken = redisService.getValues(JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id);

            System.out.println("레디스 리프레시 토큰  : " + redisToken);

            if (token.equals(redisToken)){
                System.out.println("레디스 == 기존");
                return generateAccessToken(Long.parseLong(id), role);
            }
        } catch (JWTVerificationException e) {
            e.printStackTrace();
        }
        return "올바르지 않은 리프레시 토큰입니다.";
    }
    public String generateAccessToken(Long id, String role){

        // HMAC 방식의 access 토큰
        return JWT.create()
                .withSubject(JwtProperties.ACCESS_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.ACCESS_EXPIRATION_TIME)) //30분
                .withClaim("role", role)
                .withClaim("id", id)
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));
    }

    public String generateRefreshToken(Long id, String role){

        // HMAC 방식의 access 토큰
        return JWT.create()
                .withSubject(JwtProperties.REFRESH_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.REFRESH_EXPIRATION_TIME)) //30분
                .withClaim("role", role)
                .withClaim("id", id)
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));
    }

    // 로그아웃시 redis의 리프레시 토큰 날려버리기
    public Long deleteRefreshToken(String accessToken){
        DecodedJWT jwt = verifyToken(accessToken);

        String role = jwt.getClaim("role").toString();
        String id = jwt.getClaim("id").toString();

        String key = JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id;
        redisService.deleteValues(key);

        return Long.parseLong(id);
    }

}
