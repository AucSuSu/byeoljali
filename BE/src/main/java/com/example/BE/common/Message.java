package com.example.BE.common;
import lombok.Data;

@Data
public class Message {

    private HttpStatusEnum status;
    private String message;
    private Object object;

    public Message(HttpStatusEnum status, String message, Object object) {
        this.status = status;
        this.message = message;
        this.object = object;
    }
}