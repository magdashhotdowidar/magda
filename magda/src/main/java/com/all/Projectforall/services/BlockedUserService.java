package com.all.Projectforall.services;


import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import com.all.Projectforall.entitys.BlockedUser;
import com.all.Projectforall.entitys.MyPrivacy;
import com.all.Projectforall.models.BlockedUserModel;
import com.all.Projectforall.models.PrivacyModel;
import com.all.Projectforall.repos.BlockedUserRepository;
import com.all.Projectforall.repos.PrivacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class BlockedUserService {

    @Autowired
    private BlockedUserRepository repo;
    @Autowired
    private Usersandauthoritiesrepos user_repo;

    public CompletableFuture<String> createBlocking(BlockedUserModel user) {
        String message = "";
        BlockedUser obj = repo.save(new BlockedUser(user));
        if (obj != null) message = "success";
        else message = "fail";

        return CompletableFuture.completedFuture(message);
    }

    public CompletableFuture<List<Authusermodel>> getAllBlockedUsers(String user) {
        List<BlockedUser> list=repo.findByUser(user);
        return CompletableFuture.completedFuture(list.stream().map(x -> {
            return  user_repo.findByUsername( x.getBlockedUser()).get();
        }).map(Authusermodel::new).collect(Collectors.toList()));
    }

    public CompletableFuture<String>deleteBlockedUser(String user,String blockedUser){
        String message = "";
        BlockedUser obj=repo.findByUserAndBlockedUser(user,blockedUser).get();

        if (obj != null) {
            repo.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }


}
