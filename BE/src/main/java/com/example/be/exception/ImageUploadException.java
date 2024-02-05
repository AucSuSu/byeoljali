package com.example.be.exception;

/**
 * 해당 예외는 팬 프로필 이미지 업로드에 실패했을때 발생하는 에러입니다.
 */
public class ImageUploadException extends RuntimeException{
    public ImageUploadException(String message, Throwable cause) {
        super(message, cause);
    }
}
