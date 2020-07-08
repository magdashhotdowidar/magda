package com.all.Projectforall.models;

import com.all.Projectforall.entitys.InvoProduct;
import com.all.Projectforall.entitys.Product;
import org.springframework.web.multipart.MultipartFile;


public class ProductModel {

    private String name;
    private String brand;
    private String description;
    private String category;
    private int amount;
    private double price;
    private String imageName;
    private String the_admin;

    public ProductModel() {
    }

    public ProductModel(String name, String brand, String description, String category, int amount, double price, String imageName) {
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.price = price;
        this.imageName = imageName;
    }

    public ProductModel(Product product) {
        this.name = product.getName();
        this.brand = product.getBrand();
        this.description = product.getDescription();
        this.category = product.getCategory();
        this.amount = product.getAmount();
        this.price = product.getPrice();
        this.imageName = product.getImageName();
        this.the_admin=product.getTheAdmin();

    }

    public ProductModel(InvoProduct product) {
        this.name = product.getName();
        this.amount = product.getAmount();
        this.price = product.getPrice();
        this.the_admin=product.getTheAdmin();
        //  this.file=product.getFile();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getThe_admin() {
        return the_admin;
    }

    public void setThe_admin(String the_admin) {
        this.the_admin = the_admin;
    }

    @Override
    public String toString() {
        return "ProductModel{" +
                "name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}
