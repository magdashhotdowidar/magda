package com.all.Projectforall.entitys;

import com.all.Projectforall.models.NotificationModel;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String publisher;
    private String message;

    public Notification() {}

    public Notification(NotificationModel notification) {
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
        return "Notification{" +
                "id=" + id +
                ", publisher='" + publisher + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
