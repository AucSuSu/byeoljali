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
    /**
     * 현재 return -> accessToken 값만 리턴함
     * 아이디어
     *  - accessToken과 refreshToken을 함께 리턴하도록 함 (JWT)
     *  - 만약에 refreshToken이 기존과 다르다면 exception을 처리해서 다른 값을 리턴하도록 해야함
     *      -> exception을 만들어서 해당 문제 발생시 throw 시키기
     */
    public JwtToken verifyRefreshToken(String token) {

        try {
            // JWT 서명 검증
            DecodedJWT jwt = verifyToken(token);

            // 토큰에서 role과 id 추출
            String role = jwt.getClaim("role").toString();
            String id = jwt.getClaim("artistId").toString();

            // id가 null일때 -> 유효하지 않은 refreshToken
            if(id == null)
                throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");

            String redisToken = redisService.getValues(JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id);

            System.out.println("레디스 리프레시 토큰  : " + redisToken);

            if (token.equals(redisToken)){
                System.out.println("레디스 == 기존");
                String newAccessToken = generateAccessToken(Long.parseLong(id), role);
                String newRefreshToken = generateRefreshToken(Long.parseLong(id), role);

                // refreshToken 다시 저장하기
                redisService.setValuesWithTimeout(JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id, newRefreshToken, JwtProperties.REFRESH_EXPIRATION_TIME );

                // 반환값
                JwtToken genetatedJWT = new JwtToken(newAccessToken,newRefreshToken, true);
                return genetatedJWT;
            }else {
                // 같지 않을때 -> 검증 실패
                throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");
            }

            // 이거 어떤 상황에서 나는 에러임 ??? -> 따호한테 물어보기
        } catch (JWTVerificationException e) {
            throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");
        }
    }

    // 여기서 accessToken도 재발급 해줘야한다고 하하
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
