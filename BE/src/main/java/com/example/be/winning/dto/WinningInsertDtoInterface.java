package com.example.be.winning.dto;

import java.time.LocalDateTime;

public interface WinningInsertDtoInterface {
    String getTitle();
    String getEmail();
    Long getMemberFansignId();
    LocalDateTime getStartFansignTime();
    String getName();
    Long getFanId();
    Long getApplicantId();
    int getOrders();

}
