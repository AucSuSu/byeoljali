package com.example.be.applicant.dto;

import com.example.be.artist.dto.ArtistMypageResponseMemberDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.member.Member;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ApplyFormResponseDto { // 응모 폼 생성할 때 프론트에 전달해줘야 하는 것

    private String fansignTitle;
    private String fansignInfo;
    private List<ArtistMypageResponseMemberDto> memberList = new ArrayList<>();

    public ApplyFormResponseDto(ArtistFansign entity){
        this.fansignTitle = entity.getTitle();
        this.fansignInfo = entity.getInformation();
        this.memberList = new ArrayList<>();
        for (Member entityMember:entity.getArtist().getMemberList()) {
            memberList.add(new ArtistMypageResponseMemberDto(entityMember.getMemberId(), entityMember.getName(), entityMember.getProfileImageUrl()));
        }


    }

}