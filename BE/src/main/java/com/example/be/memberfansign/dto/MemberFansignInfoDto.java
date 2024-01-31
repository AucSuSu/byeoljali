package com.example.be.memberfansign.dto;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;

@Data
public class MemberFansignInfoDto {

    private Long memberfansignId;
    private Long artistfansignId;
    private FansignMode mode;
    private FansignStatus status;

    public MemberFansignInfoDto(Long memberfansignId, Long artistfansignId, FansignMode mode, FansignStatus status) {
        this.memberfansignId = memberfansignId;
        this.artistfansignId = artistfansignId;
        this.mode = mode;
        this.status = status;
    }
}
