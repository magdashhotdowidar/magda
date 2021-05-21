package com.all.Projectforall.repos.tutorial;

import com.all.Projectforall.entitys.tutorial.MyTap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MyTapRepository extends JpaRepository<MyTap, Long> {
    Optional<MyTap> findByTitle(String tap);
}
