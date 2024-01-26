package com.example.be.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {


    // refresh 토큰 검증
    public void verifyRefreshToken(String token, Long userId) {
        try {
            // JWT 서명 검증
            System.out.println("들어옴");
            String refreshToken = token.substring(7);
            Algorithm algorithm = Algorithm.HMAC256(JwtProperties.SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(refreshToken);

            System.out.println(token);
            System.out.println(jwt.toString());
            System.out.println("여기");
            // Redis에서 저장된 리프레시 토큰 가져오기
//            String storedToken = redisService.getValues("REFRESH_TOKEN_" + userId);

            // Redis에 저장된 토큰과 비교
//            return token.equals(storedToken);
        } catch (JWTVerificationException exception) {
            System.out.println("에러발생");
            // 토큰 검증 실패
        }
    }
    public String generateAccessToken(Long id, String role){
        String key = null;
        if( role.equals("ROLE_FAN")){
            key = "fanId";
        }else if(role.equals("ROLE_ARTIST")){
            key = "artistId";
        }

        // HMAC 방식의 access 토큰
        return JWT.create()
                .withSubject(JwtProperties.ACCESS_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.ACCESS_EXPIRATION_TIME)) //30분
                .withClaim(key, id)
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));
    }

    public String generateRefreshToken(Long id, String role){
        String key = null;
        if( role.equals("ROLE_FAN")){
            key = "fanId";
        }else if(role.equals("ROLE_ARTIST")){
            key = "artistId";
        }

        // HMAC 방식의 access 토큰
        return JWT.create()
                .withSubject(JwtProperties.REFRESH_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.REFRESH_EXPIRATION_TIME)) //30분
                .withClaim(key, id)
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));
    }

}
