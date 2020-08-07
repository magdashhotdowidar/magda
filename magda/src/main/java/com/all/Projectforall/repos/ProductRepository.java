package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.entitys.compositkey.ProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, ProductKey> {
    public Optional<Product> findById_NameAndId_TheAdmin(String name,String admin);
    public List<Product>findByCategoryAndId_TheAdmin(String categoryName,String admin);
    public List<Product>findAllById_TheAdmin(String admin);

    @Query("select p.id.name from Product p where p.id.theAdmin=:theAdmin")
    public List<String>selectNames(@Param("theAdmin") String admin);

}
