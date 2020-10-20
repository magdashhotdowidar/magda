package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Friend;

public class FriendModel {

    private String userName;
    private String friendName;

    public FriendModel() {
    }

    public FriendModel(Friend friend) {
        this.friendName=friend.getFriendName();
        this.userName=friend.getUserName();
    }

    public FriendModel(String userName, String friendName) {
        this.userName = userName;
        this.friendName = friendName;
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
        return "FriendModel{" +
                "userName='" + userName + '\'' +
                ", friendName='" + friendName + '\'' +
                '}';
    }
}
