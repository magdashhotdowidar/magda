package com.all.Projectforall.auth;

import java.io.Serializable;
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;

    private final String jwttoken;
    private final String jwtUserName;
    private final String role;
    private final String theUserAdmin;

    public JwtResponse(String jwttoken,String jwtUserName,String role,String theUserAdmin) {
        this.jwttoken = jwttoken;
        this.jwtUserName=jwtUserName;
        this.role=role;
        this.theUserAdmin=theUserAdmin;
    }

    public String getJwttoken() {
        return this.jwttoken;
    }
    public String getJwtUserName() {
        return this.jwtUserName;
    }
    public String getTheUserAdmin() {
        return theUserAdmin;
    }
    public String getRole() {
        return role;
    }
}
