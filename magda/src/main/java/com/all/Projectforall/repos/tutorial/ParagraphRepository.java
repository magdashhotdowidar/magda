package com.all.Projectforall.repos.tutorial;

import com.all.Projectforall.entitys.tutorial.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ParagraphRepository extends JpaRepository<Paragraph, Long> {
    List<Paragraph> findByHeaderLike(String header);

    @Modifying
    @Query(value = "delete from Paragraph p  where p.link.id=:id")
    void deleteByLinkId(@Param("id")int id);
}
