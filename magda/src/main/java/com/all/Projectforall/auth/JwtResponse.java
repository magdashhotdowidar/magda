package com.all.Projectforall.auth;

import java.io.Serializable;
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;

    private final String jwttoken;
    private final String jwtUserName;
    private final String role;

    public JwtResponse(String jwttoken,String jwtUserName,String role) {
        this.jwttoken = jwttoken;
        this.jwtUserName=jwtUserName;
        this.role=role;
    }

    public String getToken() {
        return this.jwttoken;
    }
    public String getUserName() {
        return this.jwtUserName;
    }

    public String getRole() {
        return role;
    }
}
