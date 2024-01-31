package com.example.be.stmp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MailDto {
    String recieverMail; // 받는 사람 메일 주소
    String artistFansignName; // 팬싸인회 이름
    LocalDateTime startFansignTime; // 팬싸 시작 시간
    String membername;
    int orders;

    public MailDto(String recieverMail, String artistFansignName, LocalDateTime startFansignTime, String membername, int orders) {
        this.recieverMail = recieverMail;
        this.artistFansignName = artistFansignName;
        this.startFansignTime = startFansignTime;
        this.membername = membername;
        this.orders = orders;
    }
}
