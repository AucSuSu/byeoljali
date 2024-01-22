package com.example.BE.photo.repository;

import com.example.BE.photo.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    // 전체 인생네컷 조회하기
//    @Query("select p from Photo p left join fetch p.artistFansign")
//    List<PhotoDto> findAllByFetchJoin(@Param("fanId") Long fanId);
}
