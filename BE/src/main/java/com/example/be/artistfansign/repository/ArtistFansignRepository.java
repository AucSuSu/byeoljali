package com.example.be.artistfansign.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistFansignRepository extends JpaRepository<ArtistFansign, Long>, CustomArtistFansignRepository {



}
