package com.example.be.fan.repository;

import com.example.be.fan.entity.Fan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FanRepository extends JpaRepository<Fan, Long> {

    Optional<Fan> findByEmail(String email);
}
