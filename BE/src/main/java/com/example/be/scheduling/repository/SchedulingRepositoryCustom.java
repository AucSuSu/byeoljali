package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.winning.dto.WinningInsertDto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface SchedulingRepositoryCustom {
    void updateStatusToEndApply(String date);
    void updateStatusToApplying(String date);
    void updateStatusToFansign(String date);
    void updateStatusToSessionConnected(Long memberFansignId);
    int insertWinner(List<WinningInsertDto> list);
}
