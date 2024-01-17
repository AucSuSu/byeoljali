package com.example.cicdtest.winning;

import com.example.cicdtest.applicant.Applicant;
import com.example.cicdtest.common.BaseEntity;
import com.example.cicdtest.fan.Fan;
import com.example.cicdtest.memberfansign.MemberFansign;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Winning extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "winning_id")
    private Long winningId;

    private int orders;

    @ManyToOne
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;

    // 대기방 세션 (나혼자 들어감)
    private String waitingSessionId;
}
