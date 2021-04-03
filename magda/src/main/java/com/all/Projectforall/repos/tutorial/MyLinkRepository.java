package com.all.Projectforall.repos.tutorial;

import com.all.Projectforall.entitys.tutorial.MyLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MyLinkRepository extends JpaRepository<MyLink, Long> {
    MyLink findByLabel(String link);

    @Modifying
    @Query(value = "delete from links where label=:label",nativeQuery = true)
     void deleteByLabel(@Param("label")String label);
}
