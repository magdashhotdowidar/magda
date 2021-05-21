package com.all.Projectforall.repos.tutorial;

import com.all.Projectforall.entitys.tutorial.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByChannel(String channel);

    List<Video> findByChannelAndUploadDate(String channel, String date);

    List<Video> findByNameLike(String name);

    @Modifying
    @Query(value = "update Video set views =:views where name =:name ")
    void updateVideoViews(@Param("name") String name, @Param("views") Long views);
}
