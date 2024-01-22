package com.example.BE.fan.service;

import com.example.BE.fan.entity.Fan;
import com.example.BE.fan.dto.FanMyPageResponseDto;
import com.example.BE.fan.dto.FanMyPageUpdateRequestDto;
import com.example.BE.fan.repository.FanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FanService {

    private final FanRepository fanRepsitory;

    // 프로필 수정하기
    // 인증사진 등록하기
    // 프로필 페이지 정보 모두 가져오기 -> id로 가져오기

    public FanMyPageResponseDto findById(Long id){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        return new FanMyPageResponseDto(entity);
    }

    public Long update(Long id, FanMyPageUpdateRequestDto requestDto){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        entity.update(requestDto.getNickname(),requestDto.getProfileImageUrl());
        return id;
    }

    public int updateCertificationImageUrl(Long id, String certificationImageUrl){
        Fan entity = fanRepsitory.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        // 이거 질문하기
        if(entity.getChangeCount() == 4){
            new IllegalArgumentException("변경횟수를 초과하였습니다."); // 어차피 front에서 막겠지만 만약
        }else {
            entity.updateCertificationImageUrl(certificationImageUrl);
        }

        return entity.getChangeCount();
    }

    // 블랙리스트 등록
    public

}