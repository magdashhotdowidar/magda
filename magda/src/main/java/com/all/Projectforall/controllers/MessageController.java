package com.all.Projectforall.controllers;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.models.MessageModel;
import com.all.Projectforall.services.MessageService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService m_service;

   /* @RequestMapping("/")
    public CompletableFuture< String aa() {
        return "allah";
    }*/

    @GetMapping("/{from}/{to}")
    public CompletableFuture<ResponseEntity<List<MessageModel>>> getMessagesByFromAndTo(@PathVariable(value = "from") String fromA,
                                                                                        @PathVariable(value = "to") String toB) {

        CompletableFuture<List<MessageModel>> messages = m_service.getMessagesByFromAndTo(fromA, toB);
        return messages.thenApply(ResponseEntity::ok);
    }

    @GetMapping("/unRead/{to}")
    public CompletableFuture<ResponseEntity<List<MessageModel>>> getUnReadMessages(@PathVariable(value = "to") String toB) {

        CompletableFuture<List<MessageModel>> messages = m_service.getUnReadMessages(toB);
        System.out.println("UnRead Messages" + messages);
        return messages.thenApply(ResponseEntity::ok);
    }

  /*  @PostMapping()
    public CompletableFuture< MessageModel> createProduct(@Valid @RequestBody MessageModel message) {
        return m_service.save(message);
    }*/

    @PostMapping()
    public CompletableFuture<MessageModel> createProduct(@RequestParam(value = "image", required = false) MultipartFile image,
                                                         @RequestParam(value = "message", required = false) String SMassage,
                                                         HttpServletRequest request) {

        MessageModel message = new Gson().fromJson(SMassage, MessageModel.class);
        if (image != null && !image.getOriginalFilename().equals("")) {
            message.setImageName(UUID.randomUUID().toString().substring(26).toUpperCase());
            FileUpload.UPloadImage(request, image, message.getImageName(), "ChatImages");
        }else message.setImageName("");

        return m_service.save(message);
    }

    @GetMapping("/{from}/{to}/read")
    public void updateProduct(@PathVariable(value = "from") String from,
                              @PathVariable(value = "to") String to) {

        m_service.setRead(from, to);
    }

}
