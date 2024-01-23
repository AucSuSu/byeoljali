package com.example.be.photo.service;

import com.example.be.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PhotoService {

    private final PhotoRepository photoRepository;

    // 인생 네컷 페이지 - 전체 조회
    // 인생네컷 결제
    // 인생네컷 삭제
    // 인생네컷 다운로드
    // 필터 - 날짜별, 결제완료, 아티스트 별
}
