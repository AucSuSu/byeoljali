package com.example.be.exception;

public class SessionClosedException extends IllegalStateException{
    public SessionClosedException(String message) {
        super(message);
    }

}
