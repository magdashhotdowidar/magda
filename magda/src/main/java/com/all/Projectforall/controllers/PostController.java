package com.all.Projectforall.controllers;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.NotificationModel;
import com.all.Projectforall.models.PostModel;
import com.all.Projectforall.services.PostService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService p_service;

   /* @RequestMapping("/")
    public CompletableFuture< String aa() {
        return "allah";
    }*/

    @GetMapping("/{from}/user")
    public CompletableFuture<ResponseEntity<List<PostModel>>> getUserPosts(@PathVariable(value = "from") String from) {

        CompletableFuture<List<PostModel>> posts = p_service.getAllUserPosts(from);
        return posts.thenApply(ResponseEntity::ok);
    }


    @GetMapping("/{from}")
    public CompletableFuture<ResponseEntity<List<PostModel>>> getUserFriendsPosts(@PathVariable(value = "from") String from) {

        CompletableFuture<List<PostModel>> posts = p_service.getAllUserFriendsRecentPosts(from);
        return posts.thenApply(ResponseEntity::ok);
    }

    @GetMapping("/notification/{from}")
    public CompletableFuture<ResponseEntity<List<NotificationModel>>> getUserFriendsNotification(@PathVariable(value = "from") String from) {

        CompletableFuture<List<NotificationModel>> posts = p_service.getAllUserFriendsRecentNotifications(from);
        return posts.thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<PostModel> createProduct(@RequestParam(value = "file", required = false) MultipartFile file,
                                                      @RequestParam(value = "post", required = false) String SPost,
                                                      HttpServletRequest request)
            throws ResourceNotFoundException, ExecutionException, InterruptedException {

        if (file !=null||!file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(), "post");

        PostModel post = new Gson().fromJson(SPost, PostModel.class);
        return p_service.save(post);
    }

    @PostMapping("/comment")
    public CompletableFuture<PostModel>saveComment(@Valid @RequestBody PostModel postModel){
        return p_service.save(postModel);
    }

    @PostMapping("/notification")
    public CompletableFuture<NotificationModel>saveNotification(@Valid @RequestBody NotificationModel notification){
        return p_service.saveNotification(notification);
    }

}
