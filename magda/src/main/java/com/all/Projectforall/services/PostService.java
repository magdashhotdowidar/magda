package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Comment;
import com.all.Projectforall.entitys.Post;
import com.all.Projectforall.models.PostModel;
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

    public CompletableFuture<List<PostModel>> getAllUserPosts(String publisher) {
        List<PostModel> posts = p_repo.findAllByPublisher(publisher)
                .stream().map(PostModel::new).collect(Collectors.toList());
        Collections.sort(posts);
        return CompletableFuture.completedFuture(posts);
    }

    public CompletableFuture<List<PostModel>> getAllUserFriendsRecentPosts(String publisher) {
        List<PostModel> posts = p_repo.findAllUserFriendsPosts(f_service.allUserFriendsNames(publisher))
                .stream().map(PostModel::new).collect(Collectors.toList());
        Collections.sort(posts);
        return CompletableFuture.completedFuture(posts);
    }


    public CompletableFuture<PostModel> save(PostModel postModel) {
        Post post = new Post(postModel);
        postModel.getComments().forEach(commentModel -> {
            post.add_Comment(new Comment(commentModel));
        });
        return CompletableFuture.completedFuture(new PostModel(p_repo.save(post)));

    }


}
