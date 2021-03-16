package com.all.Projectforall.models;

import com.all.Projectforall.entitys.BlockedUser;
import com.all.Projectforall.entitys.MyPrivacy;

public class BlockedUserModel {

    private String user;
    private String blockedUser;

    public BlockedUserModel() {
    }
    public BlockedUserModel(BlockedUser obj) {
        this.user=obj.getUser();
        this.blockedUser=obj.getBlockedUser();
    }

    public BlockedUserModel(String user, String blockedUser) {
        this.user = user;
        this.blockedUser = blockedUser;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getBlockedUser() {
        return blockedUser;
    }

    public void setBlockedUser(String blockedUser) {
        this.blockedUser = blockedUser;
    }

    @Override
    public String toString() {
        return "BlockedUserModel{" +
                "user='" + user + '\'' +
                ", blockedUser='" + blockedUser + '\'' +
                '}';
    }
}
