package com.example.be.artistfansign.repository;


import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.entity.FansignStatus;

import java.util.List;

public interface CustomArtistFansignRepository {
    List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId);
    List<ArtistsMyFansignResponseDto> findArtistsMyFansign(Long artistId, FansignStatus status);
}
