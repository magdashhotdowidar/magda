package com.all.Projectforall.controllers;

import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.entitys.FriendRequest;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.services.CartService;
import com.all.Projectforall.services.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/friend_request")
public class FriendRequestController {

    @Autowired
    private FriendRequestService c_service;

    /* @RequestMapping("/")
     public String aa() {return "allah"; }*/
    @GetMapping("/from/{from}")
    public ResponseEntity<List<FriendRequest>> getFriendRequestByForm(@PathVariable(value = "from") String from) {
        List<FriendRequest> friendRequests = c_service.getRequestByFrom(from);
        return ResponseEntity.ok().body(friendRequests.stream().collect(Collectors.toList()));
    }

    @GetMapping("/to/{to}")
    public ResponseEntity<List<FriendRequest>> getFriendRequestByTo(@PathVariable(value = "to") String to) {
        List<FriendRequest> friendRequests = c_service.getRequestByTo(to);
        return ResponseEntity.ok().body(friendRequests.stream().collect(Collectors.toList()));
    }

    @GetMapping("/{from}/{to}")
    public ResponseEntity<List<FriendRequest>> getFriendRequestByFormAndTo(@PathVariable(value = "from") String from,
                                                                     @PathVariable(value = "to") String to)  {
        List<FriendRequest> friendRequest = c_service.getRequestByFromAndTo(from, to);
        return ResponseEntity.ok().body(friendRequest);
    }

    @PostMapping()
    public FriendRequest createProduct(@Valid @RequestBody FriendRequest friendRequest) {
        return c_service.save(friendRequest);
    }

    @DeleteMapping("/{from}/{to}")
    public Map<String, Boolean> deleteCartLine(@PathVariable(value = "from") String from,
                                               @PathVariable(value = "to") String to) {

        return c_service.deleteFriendRequest(from, to);
    }


}
