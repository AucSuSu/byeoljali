package com.example.BE.fan.repository;

import com.example.BE.fan.entity.Fan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FanRepository extends JpaRepository<Fan, Long> {
}
