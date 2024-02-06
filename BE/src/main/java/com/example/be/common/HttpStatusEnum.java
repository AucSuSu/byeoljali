package com.example.be.common;

import lombok.Getter;

@Getter
public enum HttpStatusEnum {

    OK(200, "OK"),
    BAD_REQUEST(400, "BAD_REQUEST"),
    TOKEN_EXPIRED(401, "TOKEN_EXPIRED"),
    TOKEN_INVALIDATE(401, "TOKEN_INVALIDATE"),
    NOT_FOUND(404, "NOT_FOUND"),
    PAYLOAD_TOO_LARGE(413, "PAYLOAD_TOO_LARGE"),
    INTERNAL_SERER_ERROR(500, "INTERNAL_SERVER_ERROR"),
    SESSION_CLOSED_ERROR(500, "session_closed_error");

    private int statusCode;
    private String code;


    HttpStatusEnum(int statusCode, String code) {
        this.statusCode = statusCode;
        this.code = code;
    }

}