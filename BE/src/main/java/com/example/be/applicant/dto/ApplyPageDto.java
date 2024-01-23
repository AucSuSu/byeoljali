package com.example.be.applicant.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplyPageDto { // 응모 페이지에서 보여야 할 값

    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름
    private LocalDateTime startFansignTime; // 해당 팬싸 시작 시간 및 날짜
    private boolean isWon;
    private FansignStatus fansignStatus;



    public ApplyPageDto(String posterImageUrl, String artistFansignTitle, String memberName, LocalDateTime startFansignTime, boolean isWon, FansignStatus fansignStatus) {
        this.posterImageUrl = posterImageUrl;
        this.artistFansignTitle = artistFansignTitle;
        this.memberName = memberName;
        this.startFansignTime = startFansignTime;
        this.isWon = isWon;
        this.fansignStatus = fansignStatus;
    }
}