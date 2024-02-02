package com.example.be.artistfansign.dto;

import lombok.Data;

@Data
public class FansignGroupByStatusCountResponseDto {

    int memberFansignCount;
    int status;

    public FansignGroupByStatusCountResponseDto(int count, int status) {
        this.memberFansignCount = count;
        this.status = status;
    }
}
