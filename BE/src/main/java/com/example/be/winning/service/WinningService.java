package com.example.be.winning.service;


import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.winning.dto.FansignFanResponseDto;
import com.example.be.winning.repository.WinningRepository;
import lombok.RequiredArgsConstructor;
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
