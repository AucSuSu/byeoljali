package com.example.be.winning.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WinningInsertDto {
    private String title;
    private String email;
    private Long memberfansignId;
    LocalDateTime startFansignTime; // 팬싸 시작 시간
    private String name;
    private Long fanId;
    private Long applicantId;
    private int orders;

    public WinningInsertDto() {
    }

    public WinningInsertDto(String title, String email, Long memberfansignId, LocalDateTime startFansignTime, String name, Long fanId, Long applicantId, int orders) {
        this.title = title;
        this.email = email;
        this.memberfansignId = memberfansignId;
        this.startFansignTime = startFansignTime;
        this.name = name;
        this.fanId = fanId;
        this.applicantId = applicantId;
        this.orders = orders;
    }

    public WinningInsertDto makeDto(WinningDto dto, int orders){
        WinningInsertDto winningInsertDto = new WinningInsertDto();
        winningInsertDto.title = dto.getTitle();
        winningInsertDto.email = dto.getEmail();
        winningInsertDto.memberfansignId = dto.getMemberfansignId();
        winningInsertDto.startFansignTime = dto.getStartFansignTime();
        winningInsertDto.name = dto.getName();
        winningInsertDto.fanId = dto.getFanId();
        winningInsertDto.applicantId = dto.getApplicantId();
        winningInsertDto.orders = orders;

        return winningInsertDto;
    }
}
