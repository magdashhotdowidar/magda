package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    @Query(value = "select * from notifications where publisher in(:list)",nativeQuery = true)
    List<Notification>findAllUserFriendsNotifications(@Param("list")List<String> userFriendsNames);
}