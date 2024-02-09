package com.example.be.artist.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class ArtistsResponseDto {

    private Long artistId;
    private String artistName;
    private String artistImageUrl;

    public ArtistsResponseDto(Long artistId, String artistName, String artistImageUrl) {
        this.artistId = artistId;
        this.artistName = artistName;
        this.artistImageUrl = artistImageUrl;
    }
}
