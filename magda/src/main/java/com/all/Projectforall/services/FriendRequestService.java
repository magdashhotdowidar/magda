package com.all.Projectforall.services;


import com.all.Projectforall.entitys.FriendRequest;
import com.all.Projectforall.repos.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository c_repo;

    public CompletableFuture<List<FriendRequest>> allFriendRequests() {
        return CompletableFuture.completedFuture(c_repo.findAll().stream().collect(Collectors.toList()));

    }

    public CompletableFuture<List<FriendRequest>> getRequestByTo(String to) {
        return CompletableFuture.completedFuture(c_repo.findByTo(to));
    }

    public CompletableFuture<List<FriendRequest>> getRequestByFrom(String from) {
        return CompletableFuture.completedFuture(c_repo.findByFrom(from));
    }

    public CompletableFuture<List<FriendRequest>> getRequestByFromAndTo(String from, String to) {
        return CompletableFuture.completedFuture(c_repo.findByFromAndTo(from, to));
    }

    public CompletableFuture<String>sendFriendRequest(FriendRequest request){
        String message="";
        if(c_repo.findByFromAndTo(request.getFrom(),request.getTo()).isEmpty()) {
            if (c_repo.findByFromAndTo(request.getTo(), request.getFrom()).isEmpty()){
                if(c_repo.save(request)!=null){
                    message="request sent successfully";
                }else message="error";
            }else message="he sent already";
        }else message="you sent already";

        return CompletableFuture.completedFuture(message);
    }

    public CompletableFuture<Map<String, Boolean>> deleteFriendRequest(String from, String to) {
        List<FriendRequest> request = c_repo.findByFromAndTo(from, to);
        c_repo.delete(request.get(0));
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return CompletableFuture.completedFuture(response);
    }

}
