package com.example.be.artistfansign.repository;


import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignGroupByStatusCountDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.fan.entity.Fan;

import java.util.List;

public interface CustomArtistFansignRepository {
    List<FansignResponseDto> findTop6ByOrderByCreatedDateDesc();
    List<FansignResponseDto> findArtistFansignAndApplyInfo(Fan fan, String keyword, String orderCondition, FansignStatus status);
    List<ArtistsMyFansignResponseDto> findArtistsMyFansign(Artist artist, FansignStatus status);
    List<FansignGroupByStatusCountDto> getCountGroupByStatus(Artist artist);
}
