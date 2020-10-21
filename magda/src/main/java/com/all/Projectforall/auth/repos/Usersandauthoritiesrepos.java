package com.all.Projectforall.auth.repos;

import com.all.Projectforall.auth.entitys.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface Usersandauthoritiesrepos extends JpaRepository<MyUser,String> {
Optional<MyUser>findByUsername(String username);

//here it is possible to pass one parameter only if you want to improve or enhance this cod
List<MyUser>findByUsernameLikeOrEmailLike(String userName,String email);

    @Query("select distinct u.theUserAdmin from MyUser u")
    public List<String>selectAllUsersAdmin();

}
