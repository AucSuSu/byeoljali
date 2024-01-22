package com.example.BE.winning.repository;

import com.example.BE.winning.entity.Winning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WinningRepository extends JpaRepository<Winning, Long> {
}
