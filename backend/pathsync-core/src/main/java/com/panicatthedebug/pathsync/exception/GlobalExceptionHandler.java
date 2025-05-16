package com.panicatthedebug.pathsync.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{
     static final String MESSAGE = "message";

    @ExceptionHandler({
            UserAlreadyExistsException.class,
            ValidationException.class,
            InvalidOperationException.class
    })
    public ResponseEntity<Object> handleBadRequest(Exception e, WebRequest webRequest) {
        return handleExceptionInternal(e, Map.of(MESSAGE, e.getMessage()),
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST,
                webRequest
        );
    }

    @ExceptionHandler({
            UserNotFoundException.class,
    })
    public ResponseEntity<Object> handleNotFound(Exception e, WebRequest webRequest) {
        return handleExceptionInternal(e, Map.of(MESSAGE, e.getMessage()),
                new HttpHeaders(),
                HttpStatus.NOT_FOUND,
                webRequest
        );
    }

    @ExceptionHandler({
            UnauthorizedException.class,
            AccessDeniedException.class
    })
    public ResponseEntity<Object> handleUnauthorized(Exception e, WebRequest webRequest) {
        return handleExceptionInternal(e, Map.of(MESSAGE, e.getMessage()),
                new HttpHeaders(),
                HttpStatusCode.valueOf(401),
                webRequest
        );
    }

    @ExceptionHandler({
            Exception.class,
    })
    public ResponseEntity<Object> handleServerError(Exception e, WebRequest webRequest) {
        return handleExceptionInternal(e, Map.of(MESSAGE, "An unknown error occurred"),
                new HttpHeaders(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                webRequest
        );
    }
}
