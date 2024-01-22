package com.example.BE.artistfansign.dto;

import com.example.BE.artistfansign.entity.ArtistFansign;

public class RecentFansignResponseDto {

    private Long artistfansignId;
    private String posterImageUrl;

    public RecentFansignResponseDto(ArtistFansign artistFansign) {
        this.artistfansignId = artistFansign.getArtistfansignId();
        this.posterImageUrl = artistFansign.getPosterImageUrl();
    }

}
