package com.example.be.config.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.config.jwt.JwtProperties;
import com.example.be.config.jwt.JwtToken;
import com.example.be.config.jwt.TokenType;
import com.example.be.config.redis.RedisService;
import com.example.be.exception.RefreshTokenIncorrectException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

import static com.example.be.config.jwt.TokenType.ACCESS;
import static com.example.be.config.jwt.TokenType.REFRESH;

@Service
@Slf4j
@RequiredArgsConstructor
public class TokenService {

    private final RedisService redisService;

    // 로그인 정보로 JWT Token 만들기
    public JwtToken createToken(String role, Long id){
        // HMAC 방식으로 암호화 된 토큰

        String accessToken = generateToken(id,role, ACCESS);
        String refreshToken = generateToken(id,role, REFRESH);
        redisService.setValuesWithTimeout(JwtProperties.REDIS_REFRESH_PREFIX
                + role + "_" + id, refreshToken,
                JwtProperties.REFRESH_EXPIRATION_TIME);

        return new JwtToken(accessToken, refreshToken, id);

    }

    public DecodedJWT verifyToken(String token) throws TokenExpiredException {
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
            //System.out.println("여기당");
            // JWT 서명 검증
            DecodedJWT jwt = verifyToken(refreshToken);

            // 토큰에서 role과 id 추출
            String role = jwt.getClaim("role").asString();
            String id = jwt.getClaim("id").toString();
            //System.out.println(role);
            //System.out.println(id);
            // id가 null일때 -> 유효하지 않은 refreshToken
            if(id == null)
                throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");

            // 레디스에서 refreshToken 가져오기
            String redisTokenKey = JwtProperties.REDIS_REFRESH_PREFIX + role + "_" + id;
            String redisToken = redisService.getValues(redisTokenKey);

            //System.out.println("레디스 리프레시 토큰  : " + redisToken);
            String realRefreshToken = jwt.getToken();
            // Redis 토큰과 입력받은 토큰이 일치하면 새로운 토큰 생성
            if(realRefreshToken.equals(redisToken)) {
                return createToken(role, Long.parseLong(id));
            } else {
                throw new RefreshTokenIncorrectException("리프레시 토큰이 일치하지 않습니다.");
            }
        } catch (TokenExpiredException e) {
            Instant expiredOn = e.getExpiredOn();
            throw new TokenExpiredException("토큰이만료되었습니다.", expiredOn);
        } catch (JWTVerificationException e) {
            log.error("토큰 검증 실패 : ", e);
            throw new RefreshTokenIncorrectException("유효하지 않은 refreshToken입니다.");
        }
    }
    public String generateToken(Long id, String role, TokenType tokenType) {
        long expirationTime = 0;
        String tokenSubject = "";

        switch (tokenType) {
            case ACCESS:
                expirationTime = JwtProperties.ACCESS_EXPIRATION_TIME;
                tokenSubject = JwtProperties.ACCESS_TOKEN;
                break;
            case REFRESH:
                expirationTime = JwtProperties.REFRESH_EXPIRATION_TIME;
                tokenSubject = JwtProperties.REFRESH_TOKEN;
                break;
        }

        return JWT.create()
                .withSubject(tokenSubject)
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
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
