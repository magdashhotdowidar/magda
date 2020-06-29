package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
  List<Message>findByMessageFromAndMessageTo(String messageFrom,String messageTo);
  List<Message>findByMessageToAndRead(String to,boolean IsRead);


}
