package com.example.be.fan.entity;


import com.example.be.applicant.entity.Applicant;
import com.example.be.common.BaseEntity;
import com.example.be.photo.Photo;
import com.example.be.winning.entity.Winning;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fan extends BaseEntity {

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
    private boolean isBlacklist = false;
    private String roles;

    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

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
        this.roles = "ROLE_FAN";
    }
    public Fan(String email, String profileImageUrl, String nickname, int changeCount, boolean isBlacklist) {
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.nickname = nickname;
        this.changeCount = changeCount;
        this.isBlacklist = isBlacklist;
        this.roles = "ROLE_FAN";
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
