package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Category;

public class CategoryModel {
    private String name;
    private String description;
    private String theAdmin;

    public CategoryModel() {
    }

    public CategoryModel(Category category) {
        this.name=category.getName();
        this.description=category.getDescription();
        this.theAdmin=category.getTheAdmin();
    }

    public CategoryModel(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getTheAdmin() {
        return theAdmin;
    }

    public void setTheAdmin(String the_admin) {
        this.theAdmin = the_admin;
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
        return "CategoryModel{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
