package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    public List<FriendRequest> findByTo(String to);
    public List<FriendRequest> findByFrom(String to);
    public List<FriendRequest>findByFromAndTo(String from,String to);

}
