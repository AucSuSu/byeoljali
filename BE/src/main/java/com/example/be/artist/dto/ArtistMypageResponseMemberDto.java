package com.example.be.artist.dto;

import lombok.Data;

@Data
public class ArtistMypageResponseMemberDto {

    private Long memberId;
    private String name;
    private String profileImageUrl;

    public ArtistMypageResponseMemberDto(Long memberId, String name, String profileImageUrl) {
        this.memberId = memberId;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
    }
}
