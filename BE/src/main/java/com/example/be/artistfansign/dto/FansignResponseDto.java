package com.example.be.artistfansign.dto;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Data
public class FansignResponseDto {

    private Long artistfansignId;
    private String title;
    private String posterImageUrl;
    private Boolean isApplyed;
    private FansignStatus status;
    private Long artistId;
    private String artistName;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;
    private FansignMode mode;

    public FansignResponseDto(Long artistfansignId, String title, String posterImageUrl, Boolean isApplyed,
                              FansignStatus status, Long artistId, String artistName, LocalDateTime startApplyTime,
                              LocalDateTime endApplyTime, LocalDateTime startFansignTime, FansignMode mode) {
        this.artistfansignId = artistfansignId;
        this.title = title;
        this.posterImageUrl = posterImageUrl;
        this.isApplyed = isApplyed;
        this.status = status;
        this.artistId = artistId;
        this.artistName = artistName;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
        this.mode = mode;
    }
}
