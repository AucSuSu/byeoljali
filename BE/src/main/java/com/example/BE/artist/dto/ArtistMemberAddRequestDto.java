package com.example.be.artist.dto;

import lombok.Getter;

@Getter
public class ArtistMemberAddRequestDto {

    private Long artistId;
    private String name;
    private String profileImageUrl;

}
