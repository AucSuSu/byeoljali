package com.example.BE.winning.dto;
import com.example.BE.fan.entity.Fan;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FansignFanResponseDto {

    private LocalDate birth;
    private String nickname;
    private String name;

    // entity to dto
    public FansignFanResponseDto(Fan entity) {
        this.birth = entity.getBirth();
        this.nickname = entity.getNickname();
        this.name = entity.getName();
    }
}