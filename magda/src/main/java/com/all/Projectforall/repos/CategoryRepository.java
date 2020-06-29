package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Optional<Category> findByName(String name);

    @Query("select c.name from Category c")
    public List<String>selectNames();

}
