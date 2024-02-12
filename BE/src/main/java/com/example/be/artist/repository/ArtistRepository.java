package com.example.be.artist.repository;

import com.example.be.artist.dto.ArtistLogoResponseDto;
import com.example.be.artist.dto.ArtistsResponseDto;
import com.example.be.artist.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {


    Optional<Artist> findByEmail(String email);

    @Query("select new com.example.be.artist.dto.ArtistLogoResponseDto(artistId, name, logoImageUrl) from Artist")
    List<ArtistLogoResponseDto> findAllArtistsLogo();
    @Query("select new com.example.be.artist.dto.ArtistsResponseDto(artistId, name, artistImageUrl) from Artist")
    List<ArtistsResponseDto> findAllArtists();

}
