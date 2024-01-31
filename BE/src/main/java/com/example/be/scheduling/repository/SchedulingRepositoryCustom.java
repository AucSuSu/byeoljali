package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.memberfansign.dto.MemberFansignInfoDto;
import com.example.be.winning.dto.WinningDto;
import com.example.be.winning.dto.WinningInsertDto;

import java.util.List;

public interface SchedulingRepositoryCustom {

    void updateStatusToEndApply(String date);
    void updateStatusToApplying(String date);
    void updateStatusToFansign(String date);
    void updateStatusToSessionConnected(Long memberFansignId);
    int insertWinner(List<WinningInsertDto> list);
    List<WinningDto> getWinningInsertDto(Long memberFansignId, FansignMode orderCondition);
    List<MemberFansignInfoDto> getMemberFansignList(String current_date);
}
