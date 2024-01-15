package com.example.cicdtest.photo;

import com.example.cicdtest.fan.Fan;
import com.example.cicdtest.fansign.Fansign;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id")
    private Fan ownerFan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sign_id")
    private Fansign fansign;

    private boolean pay;
}
