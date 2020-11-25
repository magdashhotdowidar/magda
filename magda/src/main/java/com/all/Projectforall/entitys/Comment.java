package com.all.Projectforall.entitys;


import com.all.Projectforall.models.CommentModel;

import javax.persistence.*;


@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String message;
    @Column(name = "message_date")
    private String date;
    @Column(name = "comment_length")
    private int length;
    private String publisher;
    private String userPicName;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private  Post post;

    public Comment() {
    }

    public Comment(CommentModel post) {
        this.id=post.getId();
        this.message=post.getMessage();
        this.date=post.getDate();
        this.publisher=post.getUser();
        this.userPicName=post.getUserPicName();
        this.length=post.getLength();

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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getUserPicName() {
        return userPicName;
    }

    public void setUserPicName(String userPicName) {
        this.userPicName = userPicName;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", length=" + length +
                ", publisher='" + publisher + '\'' +
                ", userPicName='" + userPicName + '\'' +
                ", post=" + post +
                '}';
    }
}
