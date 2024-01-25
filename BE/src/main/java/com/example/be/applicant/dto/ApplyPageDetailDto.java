package com.example.be.applicant.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplyPageDetailDto { // 응모 페이지에서 보여야 할 값

    private Long memberfansignId;
    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름
    private String information; // 팬싸인회 정보
    private LocalDateTime startApplyTime; // 응모 시작 시간
    private LocalDateTime endApplyTime; // 응모 시작 시간
    private LocalDateTime startFansignTime;
    private int orders;
    private FansignStatus status;

    public ApplyPageDetailDto(Long memberfansignId, String posterImageUrl, String artistFansignTitle, String memberName, String information, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime, int orders, FansignStatus status) {
        this.memberfansignId = memberfansignId;
        this.posterImageUrl = posterImageUrl;
        this.artistFansignTitle = artistFansignTitle;
        this.memberName = memberName;
        this.information = information;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
        this.orders = orders;
        this.status = status;
    }
}
