package com.example.cicdtest.applicant;


import com.example.cicdtest.fan.Fan;
import com.example.cicdtest.fansign.Fansign;
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
    @JoinColumn(name = "sign_id")
    private Fansign fansign;

    private int boughtAlbum;
    private int orders;
    private boolean isWinning;
}
