package com.example.cicdtest.fanauth;

import com.example.cicdtest.common.BaseEntity;
import com.example.cicdtest.fan.Fan;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FanAuth extends BaseEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fan_social_id")
    private Long fanSocialId;

    @OneToOne
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @Enumerated(EnumType.STRING)
    private Social social;

    private String accessToken;
    private String refreshToken;
    // 토큰 만료 시간
    private LocalDate expiredAt;
}

enum Social {
    KAKAO, NAVER, GOOGLE
}
