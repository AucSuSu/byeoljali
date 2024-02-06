package com.example.be.config.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor // 이거 추가했음
public class JwtToken {
    private String accessToken;
    private String refreshToken;
    private Long id;

}
