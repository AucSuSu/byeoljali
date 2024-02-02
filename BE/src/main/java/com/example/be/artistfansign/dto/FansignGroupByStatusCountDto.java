package com.example.be.artistfansign.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FansignGroupByStatusCountDto {

    private Long memberFansignCount;
    private FansignStatus status;

    public FansignGroupByStatusCountDto(Long count, FansignStatus status) {
        this.memberFansignCount = count;
        this.status = status;
    }


}
