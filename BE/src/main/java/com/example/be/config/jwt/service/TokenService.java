package com.example.be.config.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.redis.RedisService;
import com.example.be.exception.RefreshTokenIncorrectException;
import com.example.be.fan.entity.Fan;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final RedisService redisService;

    // 로그인 정보로 JWT Token 만들기
    public JwtToken createToken(String role, Long id){
        // HMAC 방식으로 암호화 된 토큰
        String accessToken = generateAccessToken(id, role);
        String refreshToken = generateRefreshToken(id, role);
        redisService.setValuesWithTimeout(JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id, refreshToken,
                JwtProperties.ACCESS_EXPIRATION_TIME);

        return new JwtToken(accessToken, refreshToken, id);

    }

    private DecodedJWT verifyToken(String token){
        String refreshToken = token.substring(7);
        Algorithm algorithm = Algorithm.HMAC256(JwtProperties.SECRET);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(refreshToken);
    }

    // refresh 토큰 검증
    /**
     * 현재 return -> accessToken 값만 리턴함
     * 아이디어
     *  - accessToken과 refreshToken을 함께 리턴하도록 함 (JWT)
     *  - 만약에 refreshToken이 기존과 다르다면 exception을 처리해서 다른 값을 리턴하도록 해야함
     *      -> exception을 만들어서 해당 문제 발생시 throw 시키기
     */
    // refresh 토큰이 redis의 refresh 토큰과 같은지 검증
    public JwtToken verifyRefreshToken(String refreshToken) {
        try {
            // JWT 서명 검증
            DecodedJWT jwt = verifyToken(refreshToken);

            // 토큰에서 role과 id 추출
            String role = jwt.getClaim("role").asString();
            String id = jwt.getClaim("id").toString();
            System.out.println(role);
            System.out.println(id);
            // id가 null일때 -> 유효하지 않은 refreshToken
            if(id == null)
                throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");

            // 레디스에서 refreshToken 가져오기
            String redisTokenKey = JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id;
            String redisToken = redisService.getValues(redisTokenKey);

            System.out.println("레디스 리프레시 토큰  : " + redisToken);
            String realRefreshToken = jwt.getToken();
            // Redis 토큰과 입력받은 토큰이 일치하면 새로운 토큰 생성
            if(realRefreshToken.equals(redisToken)) {
                return createToken(role, Long.parseLong(id));
            } else {
                System.out.println("리프레시 토큰이 일치하지 않습니다.");
                return null;
            }
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            System.out.println("토큰 검증 실패: " + e.getMessage());
            throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");
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

        String role = jwt.getClaim("role").asString();
        String id = jwt.getClaim("id").toString();

        String key = JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id;
        redisService.deleteValues(key);

        return Long.parseLong(id);
    }

}
