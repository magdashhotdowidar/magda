package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    public List<Cart> findByUserAndName(String user,String productName);
    public List<Cart> findByUser(String user);


}
