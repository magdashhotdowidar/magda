package com.all.Projectforall.controllers.tutorial;

import com.all.Projectforall.models.tutorial.MyLinkModel;
import com.all.Projectforall.models.tutorial.MyTapModel;
import com.all.Projectforall.services.tutorial.MyTapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/tutorial/tap")
public class MyTabController {

    @Autowired
    private MyTapService service;

    @GetMapping("")
    public CompletableFuture<ResponseEntity<List<MyTapModel>>>getAllTaps() {
        return service.getAllTaps().thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{tab}")
    public CompletableFuture<ResponseEntity<List<MyLinkModel>>>getAllTapLinks(@PathVariable(value = "tab") String tap) {
        return service.getAllTapLinks(tap).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> createTab(@Valid @RequestBody MyTapModel tap) {
        return service.save(tap);
    }

    @DeleteMapping("/{tap}")
    public CompletableFuture<String> deleteTab(@PathVariable(value = "tap") String tap) {
        return service.deleteTap(tap);
    }

      /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

}