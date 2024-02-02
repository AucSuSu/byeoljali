package com.example.be.photo.dto;

import com.example.be.photo.entity.Photo;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PhotoDBDto {

    private Long memberFansignId; // 어떤 멤버의 팬싸인회인지
    private MultipartFile photo; // 인생네컷 사진
    //    private boolean pay; // 결제는 처음 DB 저장될 때는 false로
    private Long artistFansignId; // 어떤 팬싸인회인지 -> 출력해줘야함!

    protected PhotoDBDto() {
    }
    public PhotoDBDto(Long memberFansignId, MultipartFile photo, Long artistFansignId) {
        this.memberFansignId = memberFansignId;
        this.photo = photo;
        this.artistFansignId = artistFansignId;
    }
}