package com.example.be.artist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ArtistLogoResponseDto {

    private Long artistId;
    private String name;
    private String logoImageUrl;

}
