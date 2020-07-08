package com.all.Projectforall.entitys;


import com.all.Projectforall.models.ProductModel;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

/*@NoArgsConstructor
@AllArgsConstructor
@Data*/
@Entity
@Table(name = "product")
public class Product {
    /* important important note in toString method do not customize any fields you do not want to view like objects fields(relationship ) or files (multiPartFile )   */

/* important note if alter the entity class and add fields modify the table in the data base or put @Transient on the getter not on the variable
 or else you wil get the error => java.base@13.0.2/jdk.internal.misc.Unsafe.park(Native Method) .....This is very likely to create a memory leak. Stack trace of thread  */

    private int id;
    private String name;
    private String brand;
    private String description;
    private String category;
    private int amount;
    private double price;
    private String imageName;
    private String theAdmin;

    public Product() {
    }

    public Product(int id, String name, String brand, String description, String category, int amount, double price, String imageName) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.price = price;
        this.imageName = imageName;
    }

    public Product(ProductModel productModel) {
        this.name = productModel.getName();
        this.brand = productModel.getBrand();
        this.description = productModel.getDescription();
        this.category = productModel.getCategory();
        this.amount = productModel.getAmount();
        this.price = productModel.getPrice();
        this.imageName = productModel.getImageName();
        this.theAdmin=productModel.getThe_admin();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "product_Name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "product_Amount", nullable = false)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Column(name = "product_Price", nullable = false)
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Column(name = "Image_Name", nullable = false)
    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    @Column(name = "Brand_Name", nullable = false)
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Column(name = "Description", nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "Category_Name", nullable = false)
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTheAdmin() {
        return theAdmin;
    }

    public void setTheAdmin(String the_admin) {
        this.theAdmin = the_admin;
    }


    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}
