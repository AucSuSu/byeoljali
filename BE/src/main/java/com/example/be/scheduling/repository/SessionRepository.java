package com.example.be.scheduling.repository;

import com.example.be.artist.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Artist, Long>, CustomSessionRepository {

}
