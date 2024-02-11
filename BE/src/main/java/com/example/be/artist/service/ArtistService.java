package com.example.be.artist.service;

import com.example.be.artist.dto.*;
import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.config.auth.PrincipalDetails;
import com.example.be.exception.MemberNotFoundException;
import com.example.be.member.entity.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;

    @Value("${default.image.url}")
    private String noImageUrl;

    public List<ArtistsResponseDto> getArtists() {
        List<ArtistsResponseDto> list = artistRepository.findAllArtists();

        return list;
    }


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
        String companyName = dto.getCompanyName();
        String fandomName = dto.getFandomName();
        LocalDate debutDate = dto.getDebutDate();

        Artist artist = Artist.createArtist(email, encodePwd, name, noImageUrl, companyName, fandomName, debutDate);
        artistRepository.save(artist);

        responseDto.setMsg("회원가입 성공");
        return responseDto;
    }

    // 아티스트 마이페이지
    // 아티스트 멤버 추가하기

    // 이건 아티스트가 마이페이지를 조회하는 것
    public ArtistMypageResponseDto getMyPage(){

        Artist artist = getArtist();
        Artist realArtist = artistRepository.findById(artist.getArtistId()).orElseThrow(() -> new IllegalArgumentException("해당 아티스트 정보가 없습니다."));

        return new ArtistMypageResponseDto(realArtist);
    }

    // 이건 팬이 아티스트 마이페이지를 조회하는 것
    public ArtistMypageResponseDto getMyPage(Long artistId){
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new IllegalArgumentException("해당 아티스트 정보가 없습니다."));

        return new ArtistMypageResponseDto(artist);
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
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException("해당 아티스트 멤버 정보가 없습니다."));

        // 이름 업데이트 처리
        // dto에서 이름을 받았고, 그 이름이 null이 아니며 공백이 아닌 경우에만 이름을 업데이트합니다.
        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            member.setName(dto.getName());
        }

        // 이미지 업데이트 처리
        // 이미지가 제공되었고, 내용이 있는 경우에만 이미지를 업로드하고 멤버의 프로필 이미지 URL을 업데이트합니다.
        if (image != null && !image.isEmpty()) {
            try {
                String uploadUrl = s3Uploader.upload(image, "artist/" + artist.getName() + "/member", dto.getName());
                member.setProfileImageUrl(uploadUrl);
            } catch (IOException e) {
                throw new RuntimeException("이미지 업로드 중 오류 발생", e);
            }
        }

        // 멤버 정보를 저장하고 멤버 ID 반환
        memberRepository.save(member); // 변경된 멤버 정보를 저장합니다.
        return memberId; // 변경된 멤버의 ID를 반환합니다.
    }

    private Artist getArtist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getArtist();
    }
}
