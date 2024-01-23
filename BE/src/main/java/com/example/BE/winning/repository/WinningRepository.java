package com.example.be.winning.repository;


import com.example.be.winning.entity.Winning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WinningRepository extends JpaRepository<Winning, Long> {
}
