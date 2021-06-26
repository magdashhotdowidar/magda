package com.all.Projectforall.controllers;

import com.all.Projectforall.entitys.FriendRequest;
import com.all.Projectforall.services.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/friend_request")
public class FriendRequestController {

    @Autowired
    private FriendRequestService c_service;

    /* @RequestMapping("/")
     public CompletableFuture<  String aa() {return "allah"; }*/
    @GetMapping("/from/{from}")
    public CompletableFuture<ResponseEntity<List<FriendRequest>>> getFriendRequestByForm(@PathVariable(value = "from") String from) {
        CompletableFuture<List<FriendRequest>> friendRequests = c_service.getRequestByFrom(from);
        return friendRequests.thenApply(ResponseEntity::ok);
    }

    @GetMapping("/to/{to}")
    public CompletableFuture<ResponseEntity<List<FriendRequest>>> getFriendRequestByTo(@PathVariable(value = "to") String to) {
        CompletableFuture<List<FriendRequest>> friendRequests = c_service.getRequestByTo(to);
        return friendRequests.thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{from}/{to}")
    public CompletableFuture<ResponseEntity<List<FriendRequest>>> getFriendRequestByFormAndTo(@PathVariable(value = "from") String from,
                                                                                             @PathVariable(value = "to") String to) {
        CompletableFuture<List<FriendRequest>> friendRequest = c_service.getRequestByFromAndTo(from, to);
        return friendRequest.thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String>sentFriendRequest(@Valid @RequestBody FriendRequest request){
        return c_service.sendFriendRequest(request);
    }

    @DeleteMapping("/{from}/{to}")
    public CompletableFuture<Map<String, Boolean>> deleteCartLine(@PathVariable(value = "from") String from,
                                                                 @PathVariable(value = "to") String to) {

        return c_service.deleteFriendRequest(from, to);
    }


}
