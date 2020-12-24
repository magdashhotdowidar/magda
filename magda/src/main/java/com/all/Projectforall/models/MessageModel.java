package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Message;

public class MessageModel implements Comparable<MessageModel> {
    private int id;
    private String message;
    private String date;
    private String messageFrom;
    private String messageTo;
    private String imageName;
    private boolean read;

    public MessageModel() {
    }

    public MessageModel(Message message) {
        this.id=message.getId();
        this.message = message.getMessage();
        this.date = message.getDate();
        this.messageFrom = message.getMessageFrom();
        this.messageTo = message.getMessageTo();
        this.read = message.isRead();
        this.imageName=message.getImageName();
    }
    public int compareTo(MessageModel me ){
        if(id==me.id)
            return 0;
        else if(id>me.id)
            return 1;
        else
            return -1;
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

    @Override
    public String toString() {
        return "MessageModel{" +
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
