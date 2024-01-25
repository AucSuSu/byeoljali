package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.winning.dto.WinningInsertDto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface SchedulingRepositoryCustom {
    List<ArtistFansign> findByendApplyTime(LocalDateTime date);
    void updateStatusToEndApply(LocalDateTime date);
}
