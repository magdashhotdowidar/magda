package com.all.Projectforall.controllers.tutorial;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.models.tutorial.VideoModel;
import com.all.Projectforall.services.tutorial.VideoService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/tutorial/video")
public class VideoController {

    @Autowired
    private VideoService service;

    @GetMapping()
    public CompletableFuture<ResponseEntity<List<VideoModel>>> getAllVideos() {
        return service.getAllVideos().thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{name}")
    public CompletableFuture<ResponseEntity<List<VideoModel>>> getVideoByName(@PathVariable(value = "name") String name) {
        return service.getVideoByName( name).thenApply(ResponseEntity::ok);
    }

    @GetMapping("viewsUpdate/{name}/{views}")
    public CompletableFuture<ResponseEntity<String>> setVideoUpdate(@PathVariable("name") String name,@PathVariable("views")Long views) {
        return CompletableFuture.completedFuture(ResponseEntity.ok( ""+service.updateVideoViews(name,views)));
    }

    @GetMapping("/channel/{channel}")
    public CompletableFuture<ResponseEntity<List<VideoModel>>> getVideoByChannel(@PathVariable(value = "channel") String channel) {
        return service.getVideoByChannel( channel).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{channel}/{date}")
    public CompletableFuture<ResponseEntity<List<VideoModel>>> getVideoByChannelAndUploadDate(@PathVariable(value = "channel") String channel,
                                                                                              @PathVariable(value = "date")String uploadDate) {
        return service.getVideoByChannelAndUploadDate( channel,uploadDate).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> saveVideo(@RequestParam(value = "file", required = false) MultipartFile file,
                                                     @RequestParam(value = "video", required = false) String SVideo,
                                                     HttpServletRequest request) {

        if (file != null || !file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(), "video\\videos");

        VideoModel videoModel = new Gson().fromJson(SVideo, VideoModel.class);
        return service.save(videoModel);
    }

    @DeleteMapping("/{name}")
    public CompletableFuture<String> deleteLink(@PathVariable(value = "name") String name) {
        return service.deleteVideo(name);
    }

      /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

}