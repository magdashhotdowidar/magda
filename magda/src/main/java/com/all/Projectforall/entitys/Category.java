package com.all.Projectforall.entitys;

import com.all.Projectforall.models.CategoryModel;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORY")
public class Category {
    private int id;
    private String name;
    private String description;

    public Category() {
    }

    public Category(CategoryModel categoryModel){
        this.name=categoryModel.getName();
        this.description=categoryModel.getDescription();
    }

    public Category(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
