package com.example.cicdtest.winning;

import com.example.cicdtest.applicant.Applicant;
import com.example.cicdtest.fan.Fan;
import com.example.cicdtest.memberfansign.MemberFansign;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Winning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "winning_id")
    private Long winningId;

    private int orders;

    // applicant와 1:1로 둘것인지
    // 아니면 applicant 정보를 두지 않고 fan과 memberFansign만 둘 것인지

    @ManyToOne
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;
}
