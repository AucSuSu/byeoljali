package com.example.BE.artist.controller;

import com.example.BE.artist.dto.ArtistSignUpDto;
import com.example.BE.artist.dto.SignUpResponseDto;
import com.example.BE.artist.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artist")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @PostMapping("/signUp")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody ArtistSignUpDto dto){
        System.out.println("컨트롤러");
        SignUpResponseDto responseDto = artistService.signUp(dto);

        return ResponseEntity.ok(responseDto);
    }


}
