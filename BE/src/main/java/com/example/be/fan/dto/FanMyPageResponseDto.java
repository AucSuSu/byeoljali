package com.example.be.fan.dto;
import com.example.be.fan.entity.Fan;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FanMyPageResponseDto {

    private Long fanId;
    private String birth;
    private String nickname;
    private String name;
    private String profileImageUrl;
    private String email;
    private String certificationImageUrl;
    private int changeCount;
    private boolean isBlackList;

    // entity to dto
    public FanMyPageResponseDto(Fan entity) {
        this.fanId = entity.getFanId();
        this.birth = entity.getBirth();
        this.nickname = entity.getNickname();
        this.name = entity.getName();
        this.profileImageUrl = entity.getProfileImageUrl();
        this.email = entity.getEmail();
        this.certificationImageUrl = entity.getCertificationImageUrl();
        this.changeCount = entity.getChangeCount();
        this.isBlackList = entity.isBlacklist();
    }
}