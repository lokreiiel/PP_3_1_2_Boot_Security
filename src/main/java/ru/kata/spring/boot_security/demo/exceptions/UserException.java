package ru.kata.spring.boot_security.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserException {
    @ExceptionHandler
    public ResponseEntity<IncorrectUsers> handleExc(Exception exception) {
        IncorrectUsers iu = new IncorrectUsers();
        iu.setInfo(exception.getMessage());
        return new ResponseEntity<>(iu, HttpStatus.BAD_REQUEST);
    }
}
