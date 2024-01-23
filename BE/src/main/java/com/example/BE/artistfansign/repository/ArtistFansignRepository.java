package com.example.BE.artistfansign.repository;

import com.example.BE.artistfansign.dto.FansignResponseDto;
import com.example.BE.artistfansign.entity.ArtistFansign;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArtistFansignRepository extends JpaRepository<ArtistFansign, Long>, CustomArtistFansignRepository {

    List<ArtistFansign> findTop3ByOrderByCreatedDateDesc();


}
