package com.todotresde.line.manufacturing.exception;

import org.springframework.validation.Errors;

/**
 * Created by Leonardo on 21/04/2017.
 */
public class BaseException extends RuntimeException{
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
