package com.example.cicdtest.applicant;


import com.example.cicdtest.fan.Fan;
import com.example.cicdtest.fansign.Fansign;
import com.example.cicdtest.memberfansign.MemberFansign;
import com.example.cicdtest.winning.Winning;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Applicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "applicant_id")
    private Long applicantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;

    private int boughtAlbum;

}
