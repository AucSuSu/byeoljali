package com.example.BE.artist.service;

import com.example.BE.artist.Artist;
import com.example.BE.artist.dto.ArtistSignUpDto;
import com.example.BE.artist.dto.SignUpResponseDto;
import com.example.BE.artist.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SignUpResponseDto signUp(ArtistSignUpDto dto){

        SignUpResponseDto responseDto = new SignUpResponseDto();

        Optional<Artist> existingArtist = artistRepository.findByEmail(dto.getEmail());

        if( existingArtist.isPresent()){
            responseDto.setMsg("이미 존재하는 이메일입니다.");
            return responseDto;
        }
        String encodePwd = bCryptPasswordEncoder.encode(dto.getPassword());
        String email = dto.getEmail();
        String name = dto.getName();

        Artist artist = Artist.createArtist(email, encodePwd, name);
        artistRepository.save(artist);

        responseDto.setMsg("회원가입 성공");
        return responseDto;
    }
}
