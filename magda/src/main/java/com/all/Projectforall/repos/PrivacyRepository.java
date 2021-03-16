package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.MyPrivacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface PrivacyRepository extends JpaRepository<MyPrivacy,Long> {
   // Optional<MyPrivacy>findByProperty(String propery);
   List<MyPrivacy>findByUserAndProperty(String user,String property);
}
