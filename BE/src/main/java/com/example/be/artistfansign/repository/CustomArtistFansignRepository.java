package com.example.be.artistfansign.repository;


import com.example.be.artistfansign.dto.FansignResponseDto;

import java.util.List;

public interface CustomArtistFansignRepository {
    List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId);
}
