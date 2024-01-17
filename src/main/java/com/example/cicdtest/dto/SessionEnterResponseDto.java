package com.example.cicdtest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SessionEnterResponseDto {

    private String sessionId;
    private String tokenId;


}