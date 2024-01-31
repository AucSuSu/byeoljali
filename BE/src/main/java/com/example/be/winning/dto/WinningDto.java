package com.example.be.winning.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WinningDto {


    private String title;
    private String email;
    private Long memberfansignId;
    LocalDateTime startFansignTime; // 팬싸 시작 시간
    private String name;
    private Long fanId;
    private Long applicantId;

    public WinningDto(String title, String email, Long memberfansignId, LocalDateTime startFansignTime, String name, Long fanId, Long applicantId) {
        this.title = title;
        this.email = email;
        this.memberfansignId = memberfansignId;
        this.startFansignTime = startFansignTime;
        this.name = name;
        this.fanId = fanId;
        this.applicantId = applicantId;
    }
}
