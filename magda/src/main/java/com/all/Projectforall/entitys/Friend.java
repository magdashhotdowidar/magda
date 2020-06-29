package com.all.Projectforall.entitys;

import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.models.FriendModel;

import javax.persistence.*;

@Entity
@Table(name = "friends")
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;
    private String friendName;

    public Friend() {
    }
    public Friend(FriendModel friend) {
        this.friendName=friend.getFriendName();
        this.userName=friend.getUserName();
    }
    public Friend(String userName, String friendName) {
        this.userName = userName;
        this.friendName = friendName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFriendName() {
        return friendName;
    }

    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }

    @Override
    public String toString() {
        return "Friend{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", friendName='" + friendName + '\'' +
                '}';
    }
}
