package com.example.be.session.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.entity.ArtistFansign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Artist, Long>, CustomSessionRepository {

}
