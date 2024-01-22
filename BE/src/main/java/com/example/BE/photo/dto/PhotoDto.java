package com.example.BE.photo.dto;

import com.example.BE.artistfansign.ArtistFansign;
import com.example.BE.fan.entity.Fan;
import com.example.BE.memberfansign.MemberFansign;

public class PhotoDto {

    private Long photoId;
    private Long fanId; // 어떤 팬의 인생네컷인지
    private Long memberfansignId; // 어떤 멤버의 팬싸인회인지
    private String photoUrl; // 인생네컷 사진
    private boolean pay; // 결제 여부
    private Long artistFansignId; // 어떤 팬싸인회인지 -> 출력해줘야함!
}
