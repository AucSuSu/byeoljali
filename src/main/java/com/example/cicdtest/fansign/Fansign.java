package com.example.cicdtest.fansign;

import com.example.cicdtest.applicant.Applicant;
import com.example.cicdtest.common.BaseEntity;
import com.example.cicdtest.member.Member;
import com.example.cicdtest.memberfansign.MemberFansign;
import com.example.cicdtest.photo.Photo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fansign extends BaseEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sign_id")
    private Long signId;

    private String title;
    private String posterImage;
    private String information;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;

    @Enumerated(EnumType.STRING)
    private FansignStatus status;

    @Enumerated(EnumType.STRING)
    private FansignMode mode;

    @OneToMany(mappedBy = "fansign")
    private List<MemberFansign> memberFansignList = new ArrayList<>();

}

enum FansignStatus{
    // 응모대기, 응모중, 응모완료(=팬싸인회 대기), 팬싸인회중, 팬싸인회끝
    READY_APPLYING, APPLYING, READY_FANSIGN, FANSIGN, FINISH
}

enum FansignMode{
    // 랜덤방식, 내림차순 방식
    RANDOM, DESC
}
