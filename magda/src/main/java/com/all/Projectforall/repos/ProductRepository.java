package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public Optional<Product> findByNameAndTheAdmin(String name,String admin);
    public List<Product>findByCategoryAndTheAdmin(String categoryName,String admin);
    public List<Product>findAllByTheAdmin(String admin);

    @Query("select p.name from Product p where p.theAdmin=:theAdmin")
    public List<String>selectNames(@Param("theAdmin") String admin);

}
