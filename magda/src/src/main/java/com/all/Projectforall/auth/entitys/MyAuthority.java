package com.all.Projectforall.auth.entitys;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class MyAuthority {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

private String authority;

@ManyToOne
@JoinColumn(name = "username")
private MyUser user;

    public MyAuthority() {
    }

    public MyAuthority( String authority) {
        this.authority = authority;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "MyAuthority{" +
                "authority='" + authority + '\'' +
                '}';
    }
}
