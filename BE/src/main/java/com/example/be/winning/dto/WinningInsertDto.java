package com.example.be.winning.dto;

import com.example.be.applicant.entity.Applicant;
import com.example.be.fan.entity.Fan;
import com.example.be.memberfansign.entity.MemberFansign;
import lombok.Data;

import javax.persistence.*;

@Data
public class WinningInsertDto {


    private Long memberfansignId;
    private Long fanId;
    private Long applicantId;
    private int orders; // 순서

    public WinningInsertDto(Long memberfansignId, Long fanId, Long applicantId, int orders) {
        this.memberfansignId = memberfansignId;
        this.fanId = fanId;
        this.applicantId = applicantId;
        this.orders = orders;
    }
}
