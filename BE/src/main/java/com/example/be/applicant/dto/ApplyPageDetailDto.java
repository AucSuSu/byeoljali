package com.example.be.applicant.dto;

import java.time.LocalDateTime;

public class ApplyPageDetailDto { // 응모 페이지에서 보여야 할 값


    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름
    private String information; // 팬싸인회 정보
    private LocalDateTime startApplyTime; // 응모 시작 시간
    private LocalDateTime endApplyTime; // 응모 시작 시간


    public ApplyPageDetailDto(String posterImageUrl, String artistFansignTitle, String memberName, String information, LocalDateTime startApplyTime, LocalDateTime endApplyTime) {
        this.posterImageUrl = posterImageUrl;
        this.artistFansignTitle = artistFansignTitle;
        this.memberName = memberName;
        this.information = information;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
    }
}
