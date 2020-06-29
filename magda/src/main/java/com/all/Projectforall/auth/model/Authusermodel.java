package com.all.Projectforall.auth.model;

import com.all.Projectforall.auth.entitys.MyAuthority;
import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.entitys.Friend;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class Authusermodel {

    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String gender;
    private String birthDate;
    private String personalImage;
    private String backgroundImage;
    private List<String> roles;
    private List<String> friends;
    private boolean enabled;

    public Authusermodel() {}

    //this is a good way Spare me تعفيني من from customize a method for convert ENTITY TO DTO او العكسOr vice versa

    public Authusermodel(MyUser user) {
        if (user != null) {
            this.username = user.getUsername();
            this.password = user.getPassword();
            this.enabled = user.isEnabled();
            this.email=user.getEmail();
            this.gender=user.getGender();
            this.phoneNumber=user.getPhoneNumber();
            this.birthDate=user.getBirthDate();
            this.personalImage=user.getPersonalImage();
            this.backgroundImage=user.getBackgroundImage();

            if (!user.getAuthorities().isEmpty()) {
                this.roles = user.getAuthorities().stream().map(MyAuthority::getAuthority).collect(Collectors.toList());
            }

           /* if (!user.getFriends().isEmpty()) {
                this.friends = user.getFriends().stream().map(Friend::getName).collect(Collectors.toList());
            }*/

        }
    }

    public Authusermodel(String username, String password, String role, boolean enabled) {
        this.roles = new ArrayList<>();
        this.username = username;
        this.password = password;
        this.roles.add(role);
        this.enabled = enabled;
       // System.out.println("the model");
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getPersonalImage() {
        return personalImage;
    }

    public void setPersonalImage(String personalImage) {
        this.personalImage = personalImage;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    @Override
    public String toString() {
        return "Authusermodel{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", personalImage='" + personalImage + '\'' +
                ", backgroundImage='" + backgroundImage + '\'' +
                ", roles=" + roles +
                ", enabled=" + enabled +
                '}';
    }
}
