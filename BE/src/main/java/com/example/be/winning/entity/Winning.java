package com.example.be.winning.entity;


import com.example.be.applicant.entity.Applicant;
import com.example.be.applicant.repository.ApplicantRepository;
import com.example.be.common.BaseEntity;
import com.example.be.fan.entity.Fan;
import com.example.be.memberfansign.entity.MemberFansign;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Winning extends BaseEntity { // 당첨자 테이블

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "winning_id")
    private Long winningId;

    private int orders; // 순서

    @ManyToOne
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="applicant_id")
    private Applicant applicant;

}
