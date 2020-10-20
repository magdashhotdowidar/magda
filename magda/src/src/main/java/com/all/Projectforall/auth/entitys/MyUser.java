package com.all.Projectforall.auth.entitys;

import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.entitys.Friend;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USERS")
public class MyUser {
    /*
    attention attention the constraint fk_friends_users foreign key(user_id) references users(username));
    the name of the relationship (fk_friends_users)set according to the relationship between the 2 table
    likewise (as well) foreign key(user_id) as well  index ix_friend_username on friends (user_id,name);
    */

    /*the thread problem (unSafe park) check the DB it must there something wrong there specially in
    in the relationship in the table or index*/

    @Id
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String gender;
    private String birthDate;
    private String personalImage;
    private String backgroundImage;
    private String theUserAdmin;
    private int visitsCount;
    private boolean enabled;

/*    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Friend> friends;*/


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MyAuthority> authorities;


    public MyUser() {
    }


    public MyUser(Authusermodel model) {
        if (model != null) {
            this.username = model.getUsername();
            this.password = model.getPassword();
            this.enabled = model.isEnabled();
            this.email = model.getEmail();
            this.phoneNumber = model.getPhoneNumber();
            this.birthDate = model.getBirthDate();
            this.backgroundImage = model.getBackgroundImage();
            this.personalImage = model.getPersonalImage();
            this.gender = model.getGender();
            this.theUserAdmin=model.getTheUserAdmin();
            this.setVisitsCount(model.getVisitsCount());
        }
    }

    public void add_authority(MyAuthority authority) {
        if (authority != null) {
            if (authorities == null) authorities = new ArrayList<>();
            authority.setUser(this);//set the foreign key
            if (!authorities.contains(authority))
                authorities.add(authority);
        }
    }

/*    public void add_Friend(Friend friend) {
        if (friend != null) {
            if (friends == null) friends = new ArrayList<>();
            friend.setUser(this);//set the foreign key
            if (!friends.contains(friend))
                friends.add(friend);
        }
    }
    public List<Friend> getFriends() {
        return friends;
    }*/

    public List<MyAuthority> getAuthorities() {
        return authorities;
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

    public String getTheUserAdmin() {
        return theUserAdmin;
    }

    public void setTheUserAdmin(String theUserAdmin) {
        this.theUserAdmin = theUserAdmin;
    }

    public int getVisitsCount() {
        return visitsCount;
    }

    public void setVisitsCount(int visitsCount) {
        this.visitsCount = visitsCount;
    }

    @Override
    public String toString() {
        return "MyUser{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", personalImage='" + personalImage + '\'' +
                ", backgroundImage='" + backgroundImage + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
