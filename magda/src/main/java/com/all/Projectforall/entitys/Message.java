package com.all.Projectforall.entitys;


import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.MessageModel;

import javax.persistence.*;


@Entity
@Table(name = "messages")
public class Message {
    /* important important note in toString method do not customize any fields you do not want to view like objects fields(relationship ) or files (multiPartFile )   */
/* important note if alter the entity class and add fields modify the table in the data base or put @Transient on the getter not on the variable
 or else you wil get the error => java.base@13.0.2/jdk.internal.misc.Unsafe.park(Native Method) .....This is very likely to create a memory leak. Stack trace of thread  */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int likes;
    private String message;
    @Column(name = "message_date")
    private String date;
    private String messageFrom;
    private String messageTo;
    private String imageName;
    private boolean read;

    public Message() {
    }

    public Message(MessageModel message) {
        this.message=message.getMessage();
        this.date=message.getDate();
        this.messageFrom=message.getMessageFrom();
        this.messageTo=message.getMessageTo();
        this.read=message.isRead();
        this.imageName=message.getImageName();
        this.likes=message.getLikes();
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

    public String getMessageFrom() {
        return messageFrom;
    }

    public void setMessageFrom(String messageFrom) {
        this.messageFrom = messageFrom;
    }

    public String getMessageTo() {
        return messageTo;
    }

    public void setMessageTo(String messageTo) {
        this.messageTo = messageTo;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", messageFrom='" + messageFrom + '\'' +
                ", messageTo='" + messageTo + '\'' +
                ", imageName='" + imageName + '\'' +
                ", read=" + read +
                '}';
    }
}
