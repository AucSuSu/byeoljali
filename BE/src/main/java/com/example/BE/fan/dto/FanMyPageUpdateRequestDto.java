package com.example.BE.fan.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FanMyPageUpdateRequestDto {

    private String nickname;
    private String profileImageUrl;

    public FanMyPageUpdateRequestDto(String nickname, String profileImageUrl) {
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}