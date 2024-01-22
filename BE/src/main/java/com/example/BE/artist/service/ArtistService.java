package com.example.BE.artist.service;

import com.example.BE.artist.Artist;
import com.example.BE.artist.dto.ArtistSignUpDto;
import com.example.BE.artist.dto.SignUpResponseDto;
import com.example.BE.artist.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.BE.member.Member;
import com.example.BE.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;

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

    // 아티스트 마이페이지
    // 아티스트 멤버 추가하기

    public ArtistMypageResponseDto findById(Long id){
        Artist entity = artistRepository.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        return new ArtistMypageResponseDto(entity);
    }

    public Long addMember(ArtistMemberAddRequestDto dto){
        Artist artist = artistRepository.findById(dto.getArtistId()).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        Member member = new Member(artist, dto.getName(), dto.getProfileImageUrl());
        memberRepository.save(member);

        return member.getMemberId();
    }
}
