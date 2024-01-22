package com.example.BE.artist.entity;

import com.example.BE.common.BaseEntity;
import com.example.BE.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist extends BaseEntity  { // 사실은 그룹을 뜻하는 거임

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long artistId;
    private String companyName; // 소속사 이름
    private String email;
    private String password;
    private String name;
    private String artistImageUrl;

    @OneToMany(mappedBy = "artist")
    @JsonBackReference
    private List<Member> memberList = new ArrayList<>();

}
