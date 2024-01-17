package com.example.cicdtest.artist;

import com.example.cicdtest.artistauth.ArtistAuth;
import com.example.cicdtest.common.BaseEntity;
import com.example.cicdtest.member.Member;
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
public class Artist extends BaseEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long artistId;

    private String companyName;
    private String email;
    private String password;
    private String name;
    private String groupImage;

    @Embedded
    private ArtistAuth artistAuth;


    @OneToMany(mappedBy = "artist")
    private List<Member> memberList = new ArrayList<>();

}
