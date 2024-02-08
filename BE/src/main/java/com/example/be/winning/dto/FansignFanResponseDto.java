package com.example.be.winning.dto;
import com.example.be.fan.entity.Fan;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FansignFanResponseDto {

    private String birth;
    private String nickname;
    private String name;
    private String certificateImageUrl;

    // entity to dto
    public FansignFanResponseDto(Fan entity) {
        this.birth = entity.getBirth();
        this.nickname = entity.getNickname();
        this.name = entity.getName();
        this.certificateImageUrl = entity.getCertificationImageUrl();
    }
}