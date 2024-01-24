package com.example.be.photo.repository;

import com.example.be.photo.dto.PhotoResponseDto;

import java.util.List;

public interface CustomPhotoRepository {

    // keyword: 검색기능-서치하는 아티스트
    // payOrNot: 필터기능-결제 여부를 선택한 것
    List<PhotoResponseDto> findAllandFilteredPhoto(Long fanId, String keyword, Boolean payOrNot);
}
