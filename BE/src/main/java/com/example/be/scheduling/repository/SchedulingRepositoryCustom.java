package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.winning.dto.WinningDto;

import java.util.List;

public interface SchedulingRepositoryCustom {

    void updateStatusToEndApply(String date);
    void updateStatusToApplying(String date);
    void updateStatusToFansign(String date);
    void updateStatusToSessionConnected(Long memberFansignId);
    int insertWinner(List<WinningDto> list);
    List<WinningDto> getWinningInsertDto(Long memberFansignId, FansignMode orderCondition);

}
