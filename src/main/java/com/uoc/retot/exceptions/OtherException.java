package com.uoc.retot.exceptions;

public class OtherException extends RuntimeException {
    public OtherException(String message) {
        super(message);
    }
    public OtherException(String message, Throwable cause) {
        super(message, cause);
    }
}
