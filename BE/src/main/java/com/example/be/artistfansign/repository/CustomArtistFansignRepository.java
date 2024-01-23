package com.example.be.artistfansign.repository;


import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;

import java.util.List;

public interface CustomArtistFansignRepository {
    List<RecentFansignResponseDto> findTop3ByOrderByCreatedDateDesc();
    List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId, String keyword, String orderCondition, FansignStatus status);
    List<ArtistsMyFansignResponseDto> findArtistsMyFansign(Long artistId, FansignStatus status);
}
