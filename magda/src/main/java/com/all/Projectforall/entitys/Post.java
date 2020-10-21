package com.all.Projectforall.entitys;


import com.all.Projectforall.models.MessageModel;
import com.all.Projectforall.models.PostModel;

import javax.persistence.*;


@Entity
@Table(name = "posts")
public class Post {
    /* important important note in toString method do not customize any fields you do not want to view like objects fields(relationship ) or files (multiPartFile )   */
/* important note if alter the entity class and add fields modify the table in the data base or put @Transient on the getter not on the variable
 or else you wil get the error => java.base@13.0.2/jdk.internal.misc.Unsafe.park(Native Method) .....This is very likely to create a memory leak. Stack trace of thread  */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String message;
    @Column(name = "message_date")
    private String date;
    private String publisher;
    private String picName;
    private String userPicName;

    public Post() {
    }

    public Post(PostModel post) {
        this.id=post.getId();
        this.message=post.getMessage();
        this.date=post.getDate();
        this.publisher=post.getUser();
        this.picName=post.getPicName();
        this.userPicName=post.getUserPicName();

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

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
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

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", publisher='" + publisher + '\'' +
                ", picName='" + picName + '\'' +
                ", userPicName='" + userPicName + '\'' +
                '}';
    }
}
