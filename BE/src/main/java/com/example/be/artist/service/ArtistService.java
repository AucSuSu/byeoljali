package com.example.be.artist.service;

import com.example.be.artist.dto.*;
import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.config.auth.PrincipalDetails;
import com.example.be.member.entity.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;

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

    public ArtistMypageResponseDto getMyPage(){

        Artist artist = getArtist();
        Artist realArtist = artistRepository.findById(artist.getArtistId()).orElseThrow(() -> new IllegalArgumentException("해당 아티스트 정보가 없습니다."));

        return new ArtistMypageResponseDto(realArtist);
    }

    public Long addMember(ArtistMemberAddRequestDto dto, MultipartFile image){
        Artist artist = getArtist();
        try {
            String uploadUrl = s3Uploader.upload(image, "artist/" + artist.getName() + "/member", dto.getName());
            Member member = new Member(artist, dto.getName(), uploadUrl);
            memberRepository.save(member);
            return member.getMemberId();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String updateImage(MultipartFile image){
        Artist artist = getArtist();
        try {
            String uploadUrl = s3Uploader.upload(image, "artist", artist.getName());
            artist.setArtistImageUrl(uploadUrl);
            artistRepository.save(artist); // 필터단에서 artist를 가져오는데 이건 트랜잭션 단위가 아니라서 1차 캐시에 저장되지않는다. 그래서 강제적으로 save 호출
            return "완료";
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Long updateMember(Long memberId, MultipartFile image, ArtistMemberRequestDto dto){
        Artist artist = getArtist();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("해당 아티스트 멤버 정보가 없습니다."));
        member.setName(dto.getName());
        try {
            String uploadUrl = s3Uploader.upload(image, "artist/" + artist.getName() + "/member", dto.getName());
            member.setProfileImageUrl(uploadUrl);
            return memberId;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Artist getArtist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getArtist();
    }
}
