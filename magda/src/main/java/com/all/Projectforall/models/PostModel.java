package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Message;
import com.all.Projectforall.entitys.Post;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PostModel implements Comparable<PostModel> {
    private int id;
    private String message;
    private String date;
    private String user;
    private String picName;
    private String userPicName;
    private List<CommentModel> comments;

    public PostModel() {
    }

    public PostModel(Post post) {
     this.id=post.getId();
     this.message=post.getMessage();
     this.date=post.getDate();
     this.user=post.getPublisher();
     this.picName=post.getPicName();
     this.userPicName=post.getUserPicName();
        if (!post.getComments().isEmpty()) {
            this.comments = post.getComments().
                    stream().map(comment ->
                    new CommentModel(comment)
            ).collect(Collectors.toList());
        }
    }

    public int compareTo(PostModel me ){
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

    public String getPicName() {
        return picName;
    }

    public void setPicName(String picName) {
        this.picName = picName;
    }

    public String getUserPicName() {
        return userPicName;
    }

    public void setUserPicName(String userPicName) {
        this.userPicName = userPicName;
    }

    public List<CommentModel> getComments() {
        if(comments==null)comments=new ArrayList<>();
        return comments;
    }

    public void setComments(List<CommentModel> commentModelList) {
        this.comments = commentModelList;
    }

    @Override
    public String toString() {
        return "PostModel{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", user='" + user + '\'' +
                ", picName='" + picName + '\'' +
                ", userPicName='" + userPicName + '\'' +
                ", comments=" + comments +
                '}';
    }
}
