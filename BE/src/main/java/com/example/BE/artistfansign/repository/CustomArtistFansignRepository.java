package com.example.BE.artistfansign.repository;

import com.example.BE.artistfansign.dto.FansignResponseDto;
import com.example.BE.artistfansign.entity.ArtistFansign;

import java.util.List;

public interface CustomArtistFansignRepository {
    List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId);
}
