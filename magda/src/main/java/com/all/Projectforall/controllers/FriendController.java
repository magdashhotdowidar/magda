package com.all.Projectforall.controllers;

import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.entitys.Friend;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.FriendModel;
import com.all.Projectforall.services.CartService;
import com.all.Projectforall.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class FriendController {

    @Autowired
    private FriendService f_service;

   /* @RequestMapping("/")
    public String aa() { return "allah"; }*/

    @GetMapping("/friend/{user}/{name}")
    public ResponseEntity<FriendModel> getFriendByUserAndFriendName(@PathVariable(value = "user") String user,
                                                                     @PathVariable(value = "name") String friendName) {
        FriendModel friend = f_service.getFriendByUserNameAndFriendName(user,friendName);
        return ResponseEntity.ok(friend);
    }

    @GetMapping("/friend/{user}")
    public ResponseEntity<List<Authusermodel>> getAllUserFriends(@PathVariable(value = "user") String user) {
        return ResponseEntity.ok().body(f_service.allUserFriends(user));
    }

    @PostMapping("/friend")
    public FriendModel createFriend(@Valid @RequestBody FriendModel friendModel) {
        return f_service.save(friendModel);
    }



    @DeleteMapping("/friend/{user}/{name}")
    public Map<String, Boolean> deleteFriend(@PathVariable(value = "user") String user,
                                              @PathVariable(value = "name") String name){

        return f_service.deleteFriend(user,name);
    }

    @DeleteMapping("/friend/{user}")
    public Map<String, Boolean> deleteUserFriends(@PathVariable(value = "user") String user){

        return f_service.deleteAllUserFriends(user);
    }

}
