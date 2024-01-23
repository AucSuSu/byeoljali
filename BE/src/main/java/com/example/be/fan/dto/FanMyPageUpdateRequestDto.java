package com.example.be.fan.dto;
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