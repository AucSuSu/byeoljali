package com.example.be.applicant.dto;

import java.time.LocalDateTime;

public class ApplyPageDto { // 응모 페이지에서 보여야 할 값

    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름


    public ApplyPageDto(String posterImageUrl, String artistFansignTitle, String memberName, String information, LocalDateTime startApplyTime, LocalDateTime endApplyTime) {
        this.posterImageUrl = posterImageUrl;
        this.artistFansignTitle = artistFansignTitle;
        this.memberName = memberName;
    }
}