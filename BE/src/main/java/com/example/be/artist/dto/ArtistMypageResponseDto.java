package com.example.be.artist.dto;

import com.example.be.artist.entity.Artist;
import com.example.be.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArtistMypageResponseDto {

    private String name;
    private String artistImageUrl;
    private List<ArtistMypageResponseMemberDto> memberList = new ArrayList<>();

    public ArtistMypageResponseDto(Artist entity) {
        this.name = entity.getName();
        this.artistImageUrl = entity.getArtistImageUrl();
        this.memberList = new ArrayList<>();
        for(Member entityMember : entity.getMemberList()){
            memberList.add(new ArtistMypageResponseMemberDto(entityMember.getMemberId(), entityMember.getName(), entityMember.getProfileImageUrl()));
        }
    }

}