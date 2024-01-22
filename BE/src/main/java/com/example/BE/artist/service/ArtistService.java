package com.example.BE.artist.service;

import com.example.BE.artist.dto.ArtistMemberAddRequestDto;
import com.example.BE.artist.dto.ArtistMypageResponseDto;
import com.example.BE.artist.entity.Artist;
import com.example.BE.artist.repository.ArtistRepository;
import com.example.BE.member.Member;
import com.example.BE.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final MemberRepository memberRepository;

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