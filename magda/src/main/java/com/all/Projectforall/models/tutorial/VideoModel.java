package com.all.Projectforall.models.tutorial;

import com.all.Projectforall.entitys.tutorial.Video;

public class VideoModel {

    private String name;
    private String channel;
    private String uploadDate;
    private Long views;

    public VideoModel() { }

    public VideoModel(Video video){
        this.name=video.getName();
        this.channel=video.getChannel();
        this.uploadDate=video.getUploadDate();
        this.views=video.getViews();
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
        return "VideoModel{" +
                "name='" + name + '\'' +
                ", channel='" + channel + '\'' +
                ", uploadDate='" + uploadDate + '\'' +
                ", views=" + views +
                '}';
    }
}
