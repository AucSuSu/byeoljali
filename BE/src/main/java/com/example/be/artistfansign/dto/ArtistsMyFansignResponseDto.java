package com.example.be.artistfansign.dto;


import lombok.Data;
import com.example.be.artistfansign.entity.FansignStatus;

import java.time.LocalDateTime;

@Data
public class ArtistsMyFansignResponseDto {

    private Long artistFansignId;
    private Long memberFansignId;
    private String title;
    private String memberName;
    private String posterImageUrl;
    private FansignStatus status;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;

    public ArtistsMyFansignResponseDto(Long artistFansignId, Long memberFansignId, String title, String memberName, String posterImageUrl, FansignStatus status, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime) {
        this.artistFansignId = artistFansignId;
        this.memberFansignId = memberFansignId;
        this.title = title;
        this.memberName = memberName;
        this.posterImageUrl = posterImageUrl;
        this.status = status;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
    }
}
