package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.entitys.Message;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.MessageModel;
import com.all.Projectforall.repos.CartRepository;
import com.all.Projectforall.repos.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository m_repo;

    public CompletableFuture<List<MessageModel>> getMessagesByFromAndTo(String fromA, String toB) {
        List<MessageModel> list1 = m_repo.findByMessageFromAndMessageTo(fromA, toB).stream().map(MessageModel::new).collect(Collectors.toList());
        List<MessageModel> list2 = m_repo.findByMessageFromAndMessageTo(toB, fromA).stream().map(MessageModel::new).collect(Collectors.toList());
        list1.addAll(list2);
        Collections.sort(list1);
      return CompletableFuture.completedFuture(list1);

    }

    public CompletableFuture< List<MessageModel>> getUnReadMessages(String to) {
        return CompletableFuture.completedFuture( m_repo.findByMessageToAndRead(to,false).stream().map(MessageModel::new).collect(Collectors.toList()));
    }


    public CompletableFuture< MessageModel> save(MessageModel message) {
        return CompletableFuture.completedFuture( new MessageModel(m_repo.save(new Message(message))));

    }

    public void setRead(String from, String to) {

        List<Message> messages = m_repo.findByMessageFromAndMessageTo(from, to);
        messages.forEach(message -> {message.setRead(true);});
        m_repo.saveAll(messages);
    }

}
