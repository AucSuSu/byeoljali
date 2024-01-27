package com.example.be.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.config.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final RedisService redisService;

    // refresh 토큰 검증
    public String verifyRefreshToken(String token) {
        try {
            // JWT 서명 검증
            String refreshToken = token.substring(7);
            Algorithm algorithm = Algorithm.HMAC256(JwtProperties.SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(refreshToken);

            // artist인지 fan인지 확인
            String artistId = jwt.getClaim("artistId").toString();

            String key = "REFRESH_TOKEN_";
            String role = null;
            String id = null;
            if(!artistId.equals("Missing claim")){ // artist 이면
                id = artistId;
                role = "ARTIST";
            }else{
                String fanId = jwt.getClaim("fanId").toString();
                if(!fanId.equals("Missing claim")){
                    id = fanId;
                    role = "FAN";
                }
            }

            if( id == null) return "유효하지 않은 리프레시 토큰입니다.";
            System.out.println("내가 가지고 있던 refresh token : " + refreshToken);
            System.out.println();

            String redisToken = redisService.getValues(key + role + "_" + id);

            System.out.println("레디스 리프레시 토큰  : " + redisToken);

            if (refreshToken.equals(redisToken)){
                return generateAccessToken(Long.parseLong(id), "ROLE_" + role);
            }
        } catch (JWTVerificationException e) {
            e.printStackTrace();
        }
        return "올바르지 않은 리프레시 토큰입니다.";
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
