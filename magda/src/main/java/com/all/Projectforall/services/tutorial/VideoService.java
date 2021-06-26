package com.all.Projectforall.services.tutorial;


import com.all.Projectforall.entitys.tutorial.Video;
import com.all.Projectforall.models.tutorial.VideoModel;
import com.all.Projectforall.repos.tutorial.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class VideoService {

    @Autowired
    private VideoRepository repo;

    public CompletableFuture<List<VideoModel>> getAllVideos() {
        List<VideoModel> videoModelList = repo.findAll().stream().map(VideoModel::new).collect(Collectors.toList());

        return CompletableFuture.completedFuture(videoModelList);
    }

    public CompletableFuture<List<VideoModel>> getVideoByName(String name) {
        List<VideoModel> videoModelList = repo.findByNameLike("%" + name + "%").stream().map(VideoModel::new).collect(Collectors.toList());

        return CompletableFuture.completedFuture(videoModelList);
    }

    @Transactional
    public Long updateVideoViews(String name, Long views) {
        List<VideoModel> videoModelList = repo.findByNameLike(name).stream().map(VideoModel::new).collect(Collectors.toList());
        videoModelList.get(0).setViews(views);
        repo.updateVideoViews(videoModelList.get(0).getName(), videoModelList.get(0).getViews());
        return views;
    }

    public CompletableFuture<List<VideoModel>> getVideoByChannel(String channel) {
        List<VideoModel> videoModelList = repo.findByChannel(channel).stream().map(VideoModel::new).collect(Collectors.toList());

        return CompletableFuture.completedFuture(videoModelList);
    }

    public CompletableFuture<List<VideoModel>> getVideoByChannelAndUploadDate(String channel, String uploadDate) {
        List<VideoModel> videoModelList = repo.findByChannelAndUploadDate(channel, uploadDate).stream().map(VideoModel::new).collect(Collectors.toList());

        return CompletableFuture.completedFuture(videoModelList);
    }

    public CompletableFuture<String> save(VideoModel videoModel) {
        String message = "";

        Video obj = repo.save(new Video(videoModel));

        if (obj != null) message = "success";
        else message = "fail";
        return CompletableFuture.completedFuture(message);

    }

    public CompletableFuture<String> deleteVideo(String name) {
        String message = "";
        Video obj = repo.findByNameLike(name).get(0);

        if (obj != null) {
            repo.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

}
