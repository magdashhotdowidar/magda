package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Notification;

public class NotificationModel {

    private int id;
    private String publisher;
    private String message;

    public NotificationModel() {}

    public NotificationModel(Notification notification) {
        publisher=notification.getPublisher();
        message=notification.getMessage();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "NotificationModel{" +
                "id=" + id +
                ", publisher='" + publisher + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
