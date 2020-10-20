package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    public List<Friend> findByUserName(String name);
    public List<Friend> findByFriendName(String name);
    public Optional<Friend>findByUserNameAndFriendName(String user,String friend);


}
