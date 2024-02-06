package com.example.be.exception;

public class RefreshTokenIncorrectException extends RuntimeException {
    public RefreshTokenIncorrectException(String message) {
        super(message);
    }
}
