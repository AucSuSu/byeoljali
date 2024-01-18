package com.example.BE.fan;


import com.example.BE.applicant.Applicant;
import com.example.BE.common.BaseEntity;
import com.example.BE.photo.Photo;
import com.example.BE.winning.Winning;
import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fan extends BaseEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fan_id")
    private Long fanId;

    private String email;
    private String profileImage; // 자기 프사
    private String name;
    private String nickname;
    private LocalDate birth;
    private String certificationImage; // 인증사진
    private int changeCount; // 인증 사진 변경 횟수
    private boolean isBlacklist;

    @OneToMany(mappedBy = "fan")
    private List<Photo> photoList = new ArrayList<>();

    @OneToMany(mappedBy = "fan")
    private List<Applicant> applicantList = new ArrayList<>();

    @OneToMany(mappedBy = "fan")
    private List<Winning> winningList = new ArrayList<>();

}
