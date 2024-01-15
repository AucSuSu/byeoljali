package com.example.cicdtest.group;

import com.example.cicdtest.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long artistId;

    private String companyName;
    private String email;
    private String password;
    private String name;
    private String groupImage;

    @OneToMany(mappedBy = "artist")
    private List<Member> memberList = new ArrayList<>();

}
