package com.example.BE.artistfansign.repository;

import com.example.BE.artist.entity.Artist;
import com.example.BE.artistfansign.entity.ArtistFansign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistFansignRepository extends JpaRepository<ArtistFansign, Long> {
}
