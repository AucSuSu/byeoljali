package com.example.BE.fan.entity;


import com.example.BE.applicant.entity.Applicant;
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
    private String profileImageUrl; // 자기 프사
    private String name;
    private String nickname;
    private LocalDate birth;
    private String certificationImageUrl; // 인증사진
    private int changeCount; // 인증 사진 변경 횟수
    private boolean isBlacklist;

    @OneToMany(mappedBy = "fan")
    private List<Photo> photoList = new ArrayList<>();

    @OneToMany(mappedBy = "fan")
    private List<Applicant> applicantList = new ArrayList<>();

    @OneToMany(mappedBy = "fan")
    private List<Winning> winningList = new ArrayList<>();

    public Fan(String email, String profileImageUrl, String name, String nickname, LocalDate birth, String certificationImageUrl, int changeCount, boolean isBlacklist) {
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.name = name;
        this.nickname = nickname;
        this.birth = birth;
        this.certificationImageUrl = certificationImageUrl;
        this.changeCount = changeCount;
        this.isBlacklist = isBlacklist;
    }

    // update profile
    public void update(String nickname, String profileImageUrl){
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    // update profile
    public void updateCertificationImageUrl(String certificationImageUrl){
        this.certificationImageUrl = certificationImageUrl;
        this.changeCount += 1;
    }

    public void addBlacklist(){
        this.isBlacklist = true;
    }
}
