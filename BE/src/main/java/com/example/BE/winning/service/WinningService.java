package com.example.BE.winning.service;

import com.example.BE.fan.dto.FanMyPageResponseDto;
import com.example.BE.fan.entity.Fan;
import com.example.BE.fan.repository.FanRepository;
import com.example.BE.winning.dto.FansignFanResponseDto;
import com.example.BE.winning.repository.WinningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WinningService {

    private final WinningRepository winningRepository;
    private final FanRepository fanRepository;

    public FansignFanResponseDto findById(Long id){
        Fan entity = fanRepository.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));

        return new FansignFanResponseDto(entity);
    }


}
