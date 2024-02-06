package com.example.be.common;
public enum HttpStatusEnum {

    OK(200, "OK"),
    BAD_REQUEST(400, "BAD_REQUEST"),
    NOT_FOUND(404, "NOT_FOUND"),
    INTERNAL_SERER_ERROR(500, "INTERNAL_SERVER_ERROR"),
    SESSION_CLOSED_ERROR(500, "session_closed_error");
    int statusCode;
    String code;

    HttpStatusEnum(int statusCode, String code) {
        this.statusCode = statusCode;
        this.code = code;
    }

}