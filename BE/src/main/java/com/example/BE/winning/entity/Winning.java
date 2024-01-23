package com.example.BE.winning.entity;

import com.example.BE.common.BaseEntity;
import com.example.BE.fan.entity.Fan;
import com.example.BE.memberfansign.entity.MemberFansign;
import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

}
