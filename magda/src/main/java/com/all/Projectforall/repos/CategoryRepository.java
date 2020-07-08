package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Optional<Category> findByNameAndTheAdmin(String name,String admin);
    public List<Category>findAllByTheAdmin(String admin);

    @Query("select c.name from Category c where c.theAdmin=:theAdmin")
    public List<String>selectNames(@Param("theAdmin") String admin);

}
