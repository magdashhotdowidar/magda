package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Comment;
import com.all.Projectforall.entitys.Notification;
import com.all.Projectforall.entitys.Post;
import com.all.Projectforall.models.NotificationModel;
import com.all.Projectforall.models.PostModel;
import com.all.Projectforall.repos.NotificationRepository;
import com.all.Projectforall.repos.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository p_repo;
    @Autowired
    private FriendService f_service;
    @Autowired
    private NotificationRepository notificationRepository;

    public CompletableFuture<List<PostModel>> getAllUserPosts(String publisher) {
        List<PostModel> posts = p_repo.findAllByPublisher(publisher)
                .stream().map(PostModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(posts);
      /*  List<PostModel> posts = p_repo.findAllByPublisher(publisher)
                .stream().map(PostModel::new).map(postModel -> {
                    Collections.sort(postModel.getComments());
                    return postModel;
                }).collect(Collectors.toList());
        Collections.sort(posts);*/
    }

    public CompletableFuture<List<PostModel>> getAllUserFriendsRecentPosts(String publisher) {
        List<PostModel> posts = p_repo.findAllUserFriendsPosts(f_service.allUserFriendsNames(publisher))
                .stream().map(PostModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(posts);
       /* List<PostModel> posts = p_repo.findAllUserFriendsPosts(f_service.allUserFriendsNames(publisher))
                .stream().map(PostModel::new).map(postModel -> {
                    Collections.sort(postModel.getComments());
                    return postModel;
                }).collect(Collectors.toList());
        Collections.sort(posts);*/
    }
    public CompletableFuture<List<NotificationModel>> getAllUserFriendsRecentNotifications(String publisher) {
        List<NotificationModel>notifications=notificationRepository.findAllUserFriendsNotifications(f_service.allUserFriendsNames(publisher))
                .stream().map(NotificationModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(notifications);
    }


    public CompletableFuture<PostModel> save(PostModel postModel) {
        Post post = new Post(postModel);
        if(postModel.getNotification()!=null||postModel.getNotification().getPublisher().length()>0) this.saveNotification(postModel.getNotification());
        postModel.getComments().forEach(commentModel -> {
            post.add_Comment(new Comment(commentModel));
        });
        return CompletableFuture.completedFuture(new PostModel(p_repo.save(post)));

    }

    public CompletableFuture<NotificationModel>saveNotification(NotificationModel notification){
        return CompletableFuture.completedFuture(new NotificationModel(
                notificationRepository.save(new Notification(notification))));
    }



}
