package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.InvoProduct;
import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.entitys.compositkey.ProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InvoProductRepository extends JpaRepository<InvoProduct, Long> {

    @Query("select p.name,count(p.name) from InvoProduct p group by p.name")
    public List<Object[]>chartData();

}
