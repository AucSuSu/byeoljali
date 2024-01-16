package com.example.cicdtest.fan;


import com.example.cicdtest.applicant.Applicant;
import com.example.cicdtest.photo.Photo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "fan_id")
    private Long fanId;

    private String email;
    private String profileImage;
    private String name;
    private String nickname;
    private LocalDate birth;
    private String certificationImage;
    private int changeCount;
    private boolean isBlacklist;

    @OneToMany(mappedBy = "ownerFan")
    private List<Photo> photoList = new ArrayList<>();

    @OneToMany(mappedBy = "fan")
    private List<Applicant> applicantList = new ArrayList<>();
}
