package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public Optional<Product> findByName(String name);
    public List<Product>findByCategory(String categoryName);

    @Query("select p.name from Product p")
    public List<String>selectNames();

}
