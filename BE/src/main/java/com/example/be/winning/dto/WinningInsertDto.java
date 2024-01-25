package com.example.be.winning.dto;

import com.example.be.applicant.entity.Applicant;
import com.example.be.fan.entity.Fan;
import com.example.be.memberfansign.entity.MemberFansign;
import lombok.Data;

import javax.persistence.*;

@Data
public class WinningInsertDto {


    private MemberFansign memberfansign;
    private Fan fan;
    private int orders; // 순서
    private Applicant applicant;

}
