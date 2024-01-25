package com.example.be.memberfansign.dto;

import com.example.be.artistfansign.entity.FansignMode;
import lombok.Data;

@Data
public class MemberFansignInfoDto {

    private Long memberfansignId;
    private Long artistfansignId;
    private FansignMode mode;

    public MemberFansignInfoDto(Long memberfansignId, Long artistfansignId, FansignMode mode) {
        this.memberfansignId = memberfansignId;
        this.artistfansignId = artistfansignId;
        this.mode = mode;
    }
}
