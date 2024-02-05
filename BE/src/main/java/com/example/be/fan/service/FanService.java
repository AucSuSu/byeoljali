package com.example.be.fan.service;

import com.example.be.config.jwt.service.TokenService;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.config.redis.RedisService;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.s3.S3Uploader;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class FanService {

    private final FanRepository fanRepsitory;
    private final S3Uploader s3Uploader;

    // 프로필 수정하기
    // 인증사진 등록하기
    // 프로필 페이지 정보 모두 가져오기 -> id로 가져오기

    public FanMyPageResponseDto findById(){
        Fan entity = getFan();
        return new FanMyPageResponseDto(entity);
    }

    public Long update(FanMyPageUpdateRequestDto dto){
        Fan fan = getFan();
        try {
            String imageUrl ;
            if(dto.getProfileImage() == null) {
                imageUrl = null;
            }else
                imageUrl = s3Uploader.uploadProfile(dto.getProfileImage(), "fan", fan.getEmail());
            fan.update(dto.getName(), dto.getNickname(), imageUrl);
            fanRepsitory.save(fan);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
                fanRepsitory.save(fan);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return fan.getChangeCount();
    }

    // 블랙리스트 등록
    public Long addBlacklist(Long id){
        Fan entity = fanRepsitory.findById(id).
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