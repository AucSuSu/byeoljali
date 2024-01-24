package com.example.be.photo.repository;

import com.example.be.photo.dto.PhotoResponseDto;
import com.example.be.photo.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long>, CustomPhotoRepository {

    // 전체 인생네컷 조회하기
    // - fan의 모든 인생네컷을 확인하기!
    @Query("select new com.example.be.photo.dto.PhotoResponseDto(p.photoId, af.startFansignTime, p.photoUrl, p.pay, af.title) "+
            "from Photo p "+
            "join p.artistFansign af "+
            "join p.fan f "+
            "where f.fanId = :fanId ")
    List<PhotoResponseDto> findAllPhotoByArtistFSIdandFanId(@Param("fanId") Long fanId);

}