package com.example.be.applicant.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplyPageDetailDto { // 응모 페이지에서 보여야 할 값

    private Long memberfansignId;
    private Long artistfansignId;
    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름
    private Long artistId;
    private String artistName;
    private String information; // 팬싸인회 정보
    private Boolean isWon;
    private FansignStatus status;

    // 아래 두 필드: 응모했을 때만(미당첨/당첨자 아직 뽑기 전) 보여주기
    private LocalDateTime startApplyTime; // 응모 시작 시간
    private LocalDateTime endApplyTime; // 응모 시작 시간

    // 아래 두 필드: 당첨되었을 때만 보여줌
    private LocalDateTime startFansignTime; // 팬싸 시작 시간
    private int orders; // 당첨자의 팬싸 순서 - 미당첨자는 -1로 표기!

    public ApplyPageDetailDto(Long memberfansignId, Long artistfansignId, String posterImageUrl, String artistFansignTitle, String memberName, Long artistId, String artistName, String information, Boolean isWon, FansignStatus status, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime, int orders) {
        this.memberfansignId = memberfansignId;
        this.artistfansignId = artistfansignId;
        this.posterImageUrl = posterImageUrl;
        this.artistFansignTitle = artistFansignTitle;
        this.memberName = memberName;
        this.artistId = artistId;
        this.artistName = artistName;
        this.information = information;
        this.isWon = isWon;
        this.status = status;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
        this.orders = orders;
    }
}
