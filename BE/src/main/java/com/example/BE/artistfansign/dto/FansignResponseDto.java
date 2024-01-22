package com.example.BE.artistfansign.dto;

import com.example.BE.artistfansign.entity.ArtistFansign;
import com.example.BE.artistfansign.entity.FansignStatus;

public class FansignResponseDto {

    private Long artistfansignId;
    private String posterImageUrl;
    private Long applicantId;
    private FansignStatus status;

    public FansignResponseDto(Long artistfansignId, String posterImageUrl, Long applicantId, FansignStatus status) {
        this.artistfansignId = artistfansignId;
        this.posterImageUrl = posterImageUrl;
        this.applicantId = applicantId;
        this.status = status;
    }
}
