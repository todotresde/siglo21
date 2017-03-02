package com.todotresde.siglo21.cloud.exception;

import org.springframework.validation.Errors;

/**
 * Created by Leonardo on 13/01/2017.
 */
public class BaseException extends RuntimeException {
    private Errors errors;

    public BaseException(String message) {
        super(message);
    }

    public BaseException(String message, Errors errors) {
        super(message);
        this.errors = errors;
    }

    public Errors getErrors() { return errors; }
}
