package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.BlockedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface BlockedUserRepository extends JpaRepository<BlockedUser,Long> {

   List<BlockedUser>findByUser(String user);
   Optional<BlockedUser>findByUserAndBlockedUser(String user,String blockedUser);
}
