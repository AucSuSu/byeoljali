package com.example.be.photo.dto;

import lombok.Data;
import lombok.Getter;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Getter
@Data
public class PhotoResponseDto {
    // 인생네컷 조회하는 DTO

    private Long photoId;
    private LocalDateTime startFansignTime; // 팬싸인회 시작 날짜 추출해야함
    private String photoUrl; // 인생네컷 사진
    private boolean pay; // 결제 여부 -> 이거에 따라서 lock or not
    private String artistFansignTitle; // 팬싸인회 이름

    public PhotoResponseDto(Long photoId, LocalDateTime startFansignTime, String photoUrl, boolean pay, String artistFansignTitle) {
        this.photoId = photoId;
        this.startFansignTime = startFansignTime;
        this.photoUrl = photoUrl;
        this.pay = pay;
        this.artistFansignTitle = artistFansignTitle;
    }
}
