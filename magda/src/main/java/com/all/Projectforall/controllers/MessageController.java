package com.all.Projectforall.controllers;

import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.MessageModel;
import com.all.Projectforall.services.CartService;
import com.all.Projectforall.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService m_service;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

    @GetMapping("/{from}/{to}")
    public ResponseEntity<List<MessageModel>> getMessagesByFromAndTo(@PathVariable(value = "from") String fromA,
                                                                     @PathVariable(value = "to") String toB) {

        List<MessageModel> messages = m_service.getMessagesByFromAndTo(fromA, toB);
        return ResponseEntity.ok().body(messages);
    }

    @GetMapping("/unRead/{to}")
    public ResponseEntity<List<MessageModel>> getUnReadMessages(@PathVariable(value = "to") String toB) {

        List<MessageModel> messages = m_service.getUnReadMessages(toB);
        System.out.println("UnRead Messages" + messages);
        return ResponseEntity.ok().body(messages);
    }

    @PostMapping()
    public MessageModel createProduct(@Valid @RequestBody MessageModel message) {
        return m_service.save(message);
    }

    @GetMapping("/{from}/{to}/read")
    public void updateProduct(@PathVariable(value = "from") String from,
                              @PathVariable(value = "to") String to) {

        m_service.setRead(from, to);
    }

}
