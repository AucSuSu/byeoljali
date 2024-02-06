package com.example.be.fan.service;

import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.exception.ImageUploadException;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.s3.S3Uploader;

import java.io.IOException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class FanService {

    private final FanRepository fanRepository;
    private final S3Uploader s3Uploader;

    // 프로필 수정하기
    // 인증사진 등록하기
    // 프로필 페이지 정보 모두 가져오기 -> id로 가져오기

    public FanMyPageResponseDto findById(){
        Fan entity = getFan();
        return new FanMyPageResponseDto(entity);
    }

    public Long update(FanMyPageUpdateRequestDto dto) {
        Fan fan = getFan(); // getFan() 메소드는 현재 사용자(Fan)를 가져오는 로직을 구현
        Optional<MultipartFile> optionalImage = Optional.ofNullable(dto.getProfileImage());

        String imageUrl = fan.getProfileImageUrl(); // 원래 이미지

        if(!optionalImage.isEmpty()){
            // 이미지 업로드 및 URL 설정
                imageUrl = optionalImage
                    .map(profileImage -> {
                        try {
                            return s3Uploader.uploadProfile(profileImage, "fan", fan.getEmail());
                        } catch (IOException e) {
                            // IOException을 더 구체적인 비즈니스 의미를 가진 예외로 변환
                            throw new ImageUploadException("프로필 이미지 업로드에 실패했습니다.", e);
                        }
                    })
                    .orElse(null);
        }

        fan.update(dto.getName(), dto.getNickname(), imageUrl);
        fanRepository.save(fan);

        return fan.getFanId();
    }

    public int updateCertificationImageUrl(MultipartFile certImage){
        Fan fan = getFan();
        if(fan.getChangeCount() == 4){
            throw new IllegalArgumentException("변경횟수를 초과하였습니다.");
        }else {
            try {
                String imageUrl = s3Uploader.uploadCertImage(certImage, "fan", fan.getEmail());
                fan.updateCertificationImageUrl(imageUrl);
                fanRepository.save(fan);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return fan.getChangeCount();
    }

    // 블랙리스트 등록
    public Long addBlacklist(Long id){
        Fan entity = fanRepository.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        entity.addBlacklist();
        return id;
    }

    private Fan getFan(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FanPrincipalDetails fanPrincipalDetails = (FanPrincipalDetails) authentication.getPrincipal();
        return fanPrincipalDetails.getFan();
    }

}