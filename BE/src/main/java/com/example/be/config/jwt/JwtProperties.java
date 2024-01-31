package com.example.be.config.jwt;

public interface JwtProperties {
    String ACCESS_TOKEN = "Access";
    String REFRESH_TOKEN = "Refresh";
    String SECRET = "secretKey"; // 암호화 할 비밀키
    int ACCESS_EXPIRATION_TIME = 30000; // 24시간 (1/1000초)
    int REFRESH_EXPIRATION_TIME = 1209600000; // 2주

    String TOKEN_PREFIX = "Bearer ";
    String ACCESS_HEADER_STRING = "Authorization";
    String REFRESH_HEADER_STRING = "Authorization-Refresh";
}
