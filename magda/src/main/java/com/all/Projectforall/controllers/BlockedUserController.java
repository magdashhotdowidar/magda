package com.all.Projectforall.controllers;

import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.models.BlockedUserModel;
import com.all.Projectforall.models.PrivacyModel;
import com.all.Projectforall.services.BlockedUserService;
import com.all.Projectforall.services.PrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/blockingUser")
public class BlockedUserController {

    @Autowired
    private BlockedUserService service;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/


    @GetMapping("/{user}")
    public CompletableFuture<ResponseEntity<List<Authusermodel>>>getAllBlockedUsers(@PathVariable(value = "user") String user) {
        return service.getAllBlockedUsers(user).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> createPrivacy(@Valid @RequestBody BlockedUserModel user) {
        return service.createBlocking(user);
    }

    @DeleteMapping("/{user}/{blocked}")
    public CompletableFuture<String> deleteCartLine(@PathVariable(value = "user") String user,
                                                    @PathVariable(value = "blocked") String blockedUser) {
        return service.deleteBlockedUser(user,blockedUser);
    }

}
