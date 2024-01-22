package com.example.BE.fan.dto;
import com.example.BE.fan.entity.Fan;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FanMyPageResponseDto {

    private LocalDate birth;
    private String nickname;
    private String name;
    private String profileImageUrl;
    private String email;
    private String certificationImageUrl;
    private int changeCount;

    // entity to dto
    public FanMyPageResponseDto(Fan entity) {
        this.birth = entity.getBirth();
        this.nickname = entity.getNickname();
        this.name = entity.getName();
        this.profileImageUrl = entity.getProfileImageUrl();
        this.email = entity.getEmail();
        this.certificationImageUrl = entity.getCertificationImageUrl();
        this.changeCount = entity.getChangeCount();
    }
}