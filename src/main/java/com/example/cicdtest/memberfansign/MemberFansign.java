package com.example.cicdtest.memberfansign;

import com.example.cicdtest.applicant.Applicant;
import com.example.cicdtest.fansign.Fansign;
import com.example.cicdtest.member.Member;
import com.example.cicdtest.photo.Photo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberFansign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberfansign_id")
    private Long memberfansignId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sign_id")
    private Fansign fansign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memberfansign")
    private List<Photo> photoList = new ArrayList<>();

    @OneToMany(mappedBy = "memberfansign")
    private List<Applicant> applicantList = new ArrayList<>();
}
