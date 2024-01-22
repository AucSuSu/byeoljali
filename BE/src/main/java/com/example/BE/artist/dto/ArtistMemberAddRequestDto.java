package com.example.BE.artist.dto;

import com.example.BE.artist.entity.Artist;
import lombok.Data;
import lombok.Getter;

@Getter
public class ArtistMemberAddRequestDto {

    private Long artistId;
    private String name;
    private String profileImageUrl;

}
