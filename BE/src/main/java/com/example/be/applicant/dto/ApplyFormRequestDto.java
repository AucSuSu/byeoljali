package com.example.be.applicant.dto;

import lombok.Getter;

@Getter
public class ApplyFormRequestDto { // 응모 폼 제출 시 저장하는 것

    private Long memberId;
    private int boughtAlbum;
    private Long artistFansignId;


}