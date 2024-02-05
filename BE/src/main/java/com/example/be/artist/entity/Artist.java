package com.example.be.artist.entity;

import com.example.be.common.BaseEntity;
import com.example.be.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist extends BaseEntity { // 사실은 그룹을 뜻하는 거임
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long artistId;
    private String companyName; // 소속사 이름
    private String email;
    private String password;
    private String name;
    @Setter
    private String artistImageUrl;
    private String roles;

    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public static Artist createArtist(String email, String password, String name, String artistImageUrl){
        Artist artist = new Artist();
        artist.email = email;
        artist.password = password;
        artist.name = name;
        artist.artistImageUrl = artistImageUrl;
        artist.roles = "ROLE_ARTIST";

        return artist;
    }

    @OneToMany(mappedBy = "artist")
    @JsonBackReference
    private List<Member> memberList = new ArrayList<>();

}
