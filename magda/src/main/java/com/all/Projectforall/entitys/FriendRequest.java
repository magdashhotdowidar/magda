package com.all.Projectforall.entitys;

import javax.persistence.*;

@Entity
@Table(name = "FRIEND_REQUEST")
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "REQUEST_FROM", nullable = false)
    private String from;

    @Column(name = "REQUEST_TO", nullable = false)
    private String to;

    public FriendRequest() {
    }

    public FriendRequest(String from, String to) {
        this.from = from;
        this.to = to;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

  //  @Column(name = "REQUEST_FROM", nullable = false)
    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    //@Column(name = "REQUEST_TO", nullable = false)
    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    @Override
    public String toString() {
        return "FriendRequest{" +
                "id=" + id +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                '}';
    }
}
