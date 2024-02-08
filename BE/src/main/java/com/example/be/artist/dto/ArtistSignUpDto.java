package com.example.be.artist.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ArtistSignUpDto {
    private String email;
    private String name;
    private String password;
    private String companyName;
    private LocalDate debutDate;
    private String fandomName;

}
