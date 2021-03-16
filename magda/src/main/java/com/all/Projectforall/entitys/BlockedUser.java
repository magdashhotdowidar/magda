package com.all.Projectforall.entitys;

import com.all.Projectforall.models.BlockedUserModel;
import com.all.Projectforall.models.PrivacyModel;

import javax.persistence.*;

@Entity
@Table(name = "blockedusers")
public class BlockedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "blocker_user",unique = true,nullable = false)
    private String user;
    @Column(name = "blocked_user",unique = true,nullable = false)
    private String blockedUser;

    public BlockedUser() { }
    public BlockedUser(BlockedUserModel obj) {
        this.user=obj.getUser();
        this.blockedUser=obj.getBlockedUser();
    }

    public BlockedUser(String user, String blockedUser) {
        this.user = user;
        this.blockedUser = blockedUser;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

}
