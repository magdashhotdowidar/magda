package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Comment;
import com.all.Projectforall.entitys.Post;

public class CommentModel implements Comparable<CommentModel> {
    private int id;
    private String message;
    private String date;
    private String user;
    private String userPicName;

    public CommentModel() {
    }

    public CommentModel(Comment post) {
     this.id=post.getId();
     this.message=post.getMessage();
     this.date=post.getDate();
     this.user=post.getPublisher();
     this.userPicName=post.getUserPicName();
    }

    public int compareTo(CommentModel me ){
        if(id==me.id)
            return 0;
        else if(id>me.id)
            return -1;
        else
            return 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getUserPicName() {
        return userPicName;
    }

    public void setUserPicName(String userPicName) {
        this.userPicName = userPicName;
    }

    @Override
    public String toString() {
        return "PostModel{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", user='" + user + '\'' +
                ", userPicName='" + userPicName + '\'' +
                '}';
    }
}
