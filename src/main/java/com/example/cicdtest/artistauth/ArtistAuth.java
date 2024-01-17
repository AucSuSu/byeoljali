package com.example.cicdtest.artistauth;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistAuth {

    private String accessToken;
    private String refreshToken;

    // 토큰 만료 시간
    private LocalDate expiredAt;

}
