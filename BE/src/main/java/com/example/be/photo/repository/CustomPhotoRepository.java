package com.example.be.photo.repository;

import com.example.be.fan.entity.Fan;
import com.example.be.photo.dto.PhotoResponseDto;
import com.example.be.photo.entity.PayOrNot;

import java.util.List;

public interface CustomPhotoRepository {

    // keyword: 검색기능-서치하는 아티스트
    // payOrNot: 필터기능-결제 여부를 선택한 것
    List<PhotoResponseDto> findAllandFilteredPhoto(Fan fan, String keyword, PayOrNot payOrNot);
}
