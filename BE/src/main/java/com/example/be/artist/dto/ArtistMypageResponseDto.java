package com.example.be.artist.dto;

import com.example.be.artist.entity.Artist;
import com.example.be.member.entity.Member;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArtistMypageResponseDto {

    private Long artistId;
    private String name;
    private String artistImageUrl;
    private String companyName;
    private LocalDate debutDate;
    private String fandomName;
    private List<ArtistMypageResponseMemberDto> memberList = new ArrayList<>();

    public ArtistMypageResponseDto(Artist entity) {
        this.artistId = entity.getArtistId();
        this.name = entity.getName();
        this.artistImageUrl = entity.getArtistImageUrl();
        this.companyName = entity.getCompanyName();
        this.debutDate = entity.getDebutDate();
        this.fandomName = entity.getFandomName();
        this.memberList = new ArrayList<>();
        for(Member entityMember : entity.getMemberList()){
            memberList.add(new ArtistMypageResponseMemberDto(entityMember.getMemberId(), entityMember.getName(), entityMember.getProfileImageUrl()));
        }
    }

}