package com.example.be.memberfansign.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberFansignResponseDto {

    private Long artistFansignId;
    private Long memberFansignId;
    private String information;
    private String title;
    private String memberName;
    private String posterImageUrl;
    private FansignStatus status;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;

    public MemberFansignResponseDto(Long artistFansignId, Long memberFansignId, String information, String title, String memberName, String posterImageUrl, FansignStatus status, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime) {
        this.artistFansignId = artistFansignId;
        this.memberFansignId = memberFansignId;
        this.information = information;
        this.title = title;
        this.memberName = memberName;
        this.posterImageUrl = posterImageUrl;
        this.status = status;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
    }
}
