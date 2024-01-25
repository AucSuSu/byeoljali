package com.example.be.artistfansign.entity;

public enum FansignStatus {
    // 응모대기, 응모중, 응모완료(=팬싸인회 대기), 세션발급 완료, 팬싸인회중, 팬싸인회끝
    READY_APPLYING, APPLYING, READY_FANSIGN, SESSION_CONNECTED, FANSIGN, FINISH
}