package com.all.Projectforall.exceptions.custExcep;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SorryWeDontHaveThatOneException extends Exception{
    private static final long serialVersionUID = 1L;
    public SorryWeDontHaveThatOneException(String message){super(message);}

}
