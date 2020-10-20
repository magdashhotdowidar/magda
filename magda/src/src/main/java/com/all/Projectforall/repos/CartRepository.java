package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("from Cart c where c.user=:use and c.name=:name and c.the_admin=:the_admin")
    public List<Cart> findByUserAndNameAndThe_admin(@Param("use") String user,
                                                    @Param("name") String name,
                                                    @Param("the_admin") String the_admin);

    @Query("from Cart c where c.user=:use and c.the_admin=:the_admin")
    public List<Cart> findByUserAndThe_admin(@Param("use") String user,@Param("the_admin") String the_admin);
    @Query("from Cart c where  c.the_admin=:the_admin")
    public List<Cart>findAllByThe_admin(@Param("the_admin") String the_admin);


}
