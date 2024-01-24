package com.example.be.photo.dto;

import com.example.be.photo.entity.Photo;
import lombok.Data;

@Data
public class PhotoDBDto {

    private Long fanId; // 어떤 팬의 인생네컷인지
    private Long memberfansignId; // 어떤 멤버의 팬싸인회인지
    private String photoUrl; // 인생네컷 사진
    //    private boolean pay; // 결제는 처음 DB 저장될 때는 false로
    private Long artistFansignId; // 어떤 팬싸인회인지 -> 출력해줘야함!

    protected PhotoDBDto() {
    }
    public PhotoDBDto(Long fanId, Long memberfansignId, String photoUrl, Long artistFansignId) {
        this.fanId = fanId;
        this.memberfansignId = memberfansignId;
        this.photoUrl = photoUrl;
        this.artistFansignId = artistFansignId;
    }
}