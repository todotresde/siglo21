package com.todotresde.siglo21.line.exception;

import org.springframework.validation.Errors;

/**
 * Created by Leonardo on 13/01/2017.
 */
public class WorkStationException extends BaseException {

    public WorkStationException(String message, Errors errors) {
        super(message, errors);
    }
}
