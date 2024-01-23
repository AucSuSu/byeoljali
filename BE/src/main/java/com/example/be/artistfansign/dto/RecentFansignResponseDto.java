package com.example.be.artistfansign.dto;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

@Data
public class RecentFansignResponseDto {

    private Long artistfansignId;
    private String posterImageUrl;
    private FansignStatus status;

    public RecentFansignResponseDto(ArtistFansign artistFansign) {
        this.artistfansignId = artistFansign.getArtistfansignId();
        this.posterImageUrl = artistFansign.getPosterImageUrl();
        this.status = artistFansign.getStatus();
    }

    public RecentFansignResponseDto(Long artistfansignId, String posterImageUrl, FansignStatus status) {
        this.artistfansignId = artistfansignId;
        this.posterImageUrl = posterImageUrl;
        this.status = status;
    }
}
