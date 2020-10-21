package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post>findAllByPublisher(String user);

  @Query(value = "select * from posts where publisher in(:list)",nativeQuery = true)
  List<Post>findAllUserFriendsPosts(@Param("list")List<String> userFriendsNames);
}
