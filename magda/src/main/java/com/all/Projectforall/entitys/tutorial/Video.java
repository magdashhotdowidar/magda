package com.all.Projectforall.entitys.tutorial;

import com.all.Projectforall.models.tutorial.VideoModel;

import javax.persistence.*;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
   private String name;
   private String channel;
   private String uploadDate;
   private Long views;

    public Video() { }

    public Video(VideoModel video){
        this.name=video.getName();
        this.channel=video.getChannel();
        this.uploadDate=video.getUploadDate();
        this.views=video.getViews();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    @Override
    public String toString() {
        return "Video{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", channel='" + channel + '\'' +
                ", uploadDate='" + uploadDate + '\'' +
                ", views=" + views +
                '}';
    }
}
